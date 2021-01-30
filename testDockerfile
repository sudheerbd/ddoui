FROM rockmagicnet/sencha-cmd:7.0.0 AS builder
ENV OPENSSL_CONF=/dev/null
COPY . /app
RUN sencha app build production
# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=builder /app/build/production/DDO /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]
