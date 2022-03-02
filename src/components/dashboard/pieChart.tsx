// ===================================================================
//                             Imports
// ===================================================================
import React, { createRef, useEffect } from 'react';
import Chart, {
    ActiveElement,
    ChartEvent,
    ScriptableContext,
} from 'chart.js/auto';
import { Tag, TagState } from '../../redux/tags/types';
import {
    getTagCombinations,
    MixedTagExpenses,
    randomColorFromLabel,
    SortedTagExpenses,
} from '../../services/dashboard.helper';
import { Expense } from '../../redux/expenses/types';

// ===================================================================
//                            Component
// ===================================================================
type PieChartProps = {
    tags: readonly Tag[];
    expenses: readonly Expense[];
    tagState: TagState;
    width: string;
    height: string;
};

function createRadialGradient(
    context: ScriptableContext<'doughnut'>,
    colors: string[],
): CanvasGradient | undefined {
    const chartArea = context.chart.chartArea;
    if (!chartArea) {
        // This case happens on initial chart load
        return undefined;
    }

    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    //if (width !== chartWidth || height !== chartHeight) {
    //    cache.clear();
    //}
    //var gradient = cache.get(c1 + c2 + c3);
    //if (!gradient) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;
    const r = Math.min(
        (chartArea.right - chartArea.left) / 2,
        (chartArea.bottom - chartArea.top) / 2,
    );
    const ctx = context.chart.ctx;
    const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        r,
    );

    // Add color stops
    for (let n = 0; n < colors.length; n++) {
        gradient.addColorStop((n * 1) / colors.length, colors[n]);
    }
    //cache.set(c1 + c2 + c3, gradient);
    //}

    return gradient;
}

/**
 * Chip component based off MUI that has an optionally specified background color.
 * If the color is not specified, the PieChart will have a randomly-generated color
 * based on the string label. The color generation is deterministic with respect to
 * the label string.
 *
 * @param {PieChartProps} props - for the component
 * @returns {Element} PieChart element
 */
export default function PieChart(props: PieChartProps): JSX.Element {
    const canvasRef = createRef<HTMLCanvasElement>();
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            // Sort expenses into different groups based on tags
            const [singleTag, mixedTag, undefinedTag] = getTagCombinations(
                props.tags,
                props.expenses,
                props.tagState,
            );

            // Compute labels
            const singleTagLabels = singleTag.map((group) => group.tag.name);
            const mixedTagLabels = mixedTag.map((group) =>
                group.tags.map((tag) => tag.name).join('/'),
            );
            const undefinedTagLabel = 'Uncategorized';

            // Compute costs
            const singleTagCosts = singleTag.map((group) =>
                group.expenses.reduce(
                    (totalCost, expense) => expense.cost + totalCost,
                    0,
                ),
            );
            const mixedTagCosts = mixedTag.map((group) =>
                group.expenses.reduce(
                    (totalCost, expense) => expense.cost + totalCost,
                    0,
                ),
            );
            const undefinedTagCost = undefinedTag.expenses.reduce(
                (totalCost, expense) => expense.cost + totalCost,
                0,
            );

            // Compute colors
            const singleTagColors = singleTag.map((group) =>
                randomColorFromLabel(group.tag.name),
            );

            // Helper for computed mixed tag gradients
            const getMixedTagGradient = (
                context: ScriptableContext<'doughnut'>,
                group: MixedTagExpenses,
            ): CanvasGradient | undefined => {
                const tagColors = group.tags.map((t) =>
                    randomColorFromLabel(t.name),
                );
                return createRadialGradient(context, tagColors);
            };
            const mixedTagColors = (context: ScriptableContext<'doughnut'>) =>
                mixedTag.map((group) => getMixedTagGradient(context, group));

            const undefinedTagColor = 'rgb(210,210,210)'; // Some kind of gray FIXME

            const pieChart = new Chart(canvas, {
                // FIXME use patterns or other colors for accessibility: http://betweentwobrackets.com/data-graphics-and-colour-vision/
                type: 'pie',
                data: {
                    labels: [
                        ...singleTagLabels,
                        ...mixedTagLabels,
                        undefinedTagLabel,
                    ],
                    datasets: [
                        {
                            data: [
                                ...singleTagCosts,
                                ...mixedTagCosts,
                                undefinedTagCost,
                            ],
                            backgroundColor: (context) => {
                                const colors = [
                                    ...singleTagColors,
                                    ...mixedTagColors(context),
                                    undefinedTagColor,
                                ];
                                return colors[context.dataIndex];
                            },
                            hoverOffset: 4,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    onClick: (
                        e: ChartEvent,
                        activeElements: ActiveElement[],
                    ) => {
                        console.log('Click Handler!');
                        console.log(e);
                        console.log(activeElements);
                        if (activeElements.length == 1) {
                            const idx = activeElements[0].index; // FIXME check for activeElement size
                            if (idx < singleTag.length) {
                                const tag = singleTag[idx].tag;
                                console.log(tag);
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'right',
                        },
                    },
                },
            });
            // when component unmounts
            return () => {
                pieChart.destroy();
            };
        }
    }, [props]);
    return <canvas width={props.width} height={props.height} ref={canvasRef} />;
}
