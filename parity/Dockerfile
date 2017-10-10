FROM parity/parity:v1.7.2

COPY entry.sh /parity
WORKDIR /parity
RUN chmod +x /parity/entry.sh

ENTRYPOINT ["/parity/entry.sh"]
