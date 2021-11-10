// ===================================================================
//                             Imports
// ===================================================================
import React, { createRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

// ===================================================================
//                            Component
// ===================================================================
type PieChartProps = {
    labels: Array<string>;
    values: Array<number>;
    colors: Array<string>;
    width: string;
    height: string;
};

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
            new Chart(canvas, {
                type: 'pie',
                data: {
                    labels: props.labels,
                    datasets: [
                        {
                            data: props.values,
                            backgroundColor: props.colors,
                            hoverOffset: 4,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });
        }
    }, [props]);
    return <canvas width={props.width} height={props.height} ref={canvasRef} />;
}
