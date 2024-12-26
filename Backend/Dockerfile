# Укажите базовый образ для сборки
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /WebSibguty

# Копируем остальные файлы проекта и собираем
COPY ./AppRelease ./

# Команда для запуска приложения с указанием URL
CMD ["dotnet", "Backend.dll", "--urls", "http://0.0.0.0:5188"]

# Открываем порт, на котором приложение будет слушать запросы
EXPOSE 5188
