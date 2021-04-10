{ pkgs ? import <nixpkgs> {} }:

let 
  nix_vscode_extensions = with pkgs.vscode-extensions; [
    bbenoist.Nix
    vscodevim.vim
  ];

  vscode_marketplace_extensions = pkgs.vscode-utils.extensionsFromVscodeMarketplace [
    {
      name = "vscode-eslint";
      publisher = "dbaeumer";
      version = "2.1.8";
      sha256 = "18yw1c2yylwbvg5cfqfw8h1r2nk9vlixh0im2px8lr7lw0airl28";
    }
    {
      name = "prettier-vscode";
      publisher = "esbenp";
      version = "5.9.2";
      sha256 = "03dvrf028909d186i23kmcpm83xzgrgm3fmiqh94vcs1g6pqdsvl";
    }
  ];
  vscodium-with-extensions = pkgs.vscode-with-extensions.override {
    vscode = pkgs.vscodium;
    vscodeExtensions = nix_vscode_extensions ++ vscode_marketplace_extensions;
  };
in
pkgs.mkShell {
    nativeBuildInputs = with pkgs; [
        nodejs
        yarn
        vscodium-with-extensions
        python
    ];
}
