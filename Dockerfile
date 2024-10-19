FROM httpd:2.4-buster

COPY /web-sibguty-apache.conf /usr/local/apache2/conf/web-sibguty-apache.conf

RUN apt-get update && apt-get install -y nano && apt-get install -y curl

# Включаем наш конфигурационный файл в основной конфигурационный файл Apache
RUN echo "Include /usr/local/apache2/conf/web-sibguty-apache.conf" >> /usr/local/apache2/conf/httpd.conf

EXPOSE 8000