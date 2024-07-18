docker build -t font_subsetter .
docker run -v ./:/opt/fonts/out -it font_subsetter