FROM python:3.13-slim
WORKDIR /app
COPY . .
ARG API_BASE=http://127.0.0.1:8000/api
RUN echo "window.API_BASE = '${API_BASE}';" > /app/config.js
EXPOSE 5500
CMD ["python", "-m", "http.server", "5500"]
