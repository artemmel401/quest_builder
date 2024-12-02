FROM mongo:latest
COPY seed.js /docker-entrypoint-initdb.d/
CMD ["mongosh", "-u", "root", "-p", "example", "--authenticationDatabase", "admin", "localhost/data", "/docker-entrypoint-initdb.d/seed.js"]