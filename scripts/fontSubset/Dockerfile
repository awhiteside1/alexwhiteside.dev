FROM python:3.12
RUN python3 -m pip install fonttools
RUN python3 -m pip install brotli
WORKDIR /opt/fonts
RUN mkdir out
COPY InterVariable.ttf  /opt/fonts/Inter.ttf
ENV BASIC_CHARS="U+0020-007F, U+2000-206F"

CMD  pyftsubset Inter.ttf --unicodes="$BASIC_CHARS"   --layout-features='*'    --flavor="woff2"     --output-file="out/InterSmall.woff2"