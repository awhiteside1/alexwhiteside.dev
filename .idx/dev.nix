# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "unstable"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    # pkgs.go
    # pkgs.python311
    # pkgs.python311Packages.pip
    # pkgs.nodejs_20
    # pkgs.nodePackages.nodemon
    #pkgs.corepack_latest
    pkgs.nodejs
    pkgs.pnpm
  ];

  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
      "astro-build.astro-vscode"
      "imekachi.webstorm-darcula"
      "ahgood.shift-shift"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["pnpm" "dev" "--port" "$PORT" "--host"];
          manager = "web";
          env = {
            PORT = "$PORT";
          };
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
         install = "pnpm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        build="pnpm build";
        # Example: start a background task to watch and re-build backend code
        # watch-backend = "npm run watch-backend";
      };
    };
  };
}
