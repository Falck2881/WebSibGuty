using Microsoft.AspNetCore.HttpOverrides;
using EFContextLib;

public class Startup
{
        // Этот метод регистрирует различные сервисы для нашего приложения.  
        // Это могут быть интерфейсы(поведение) или подключение к базе данных.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IUserContext, UserContext>();
            services.AddSingleton<IGroupContext, GroupContext>();
            services.AddSingleton<IFacultetContext, FacultetContext>();
            services.AddHttpClient();
            services.AddControllers()
                .AddJsonOptions(option => option.JsonSerializerOptions.PropertyNamingPolicy = null);
                
            services.AddAntiforgery();

            services.AddCors(options =>
            {
                // Для разработки
                options.AddPolicy("AllowSpecificOrigin",
                    builder =>
                    {
                        builder.WithOrigins("http://127.0.0.1:8001", "http://127.0.0.1:8000", "http://localhost:8000", "http://front:5088",
                                            "malpbt83.ru", "www.malpbt83.ru", "http://front_dep:5088")
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });
            
            
            /// <summary>
            /// // !!! Конфигурируем обработку пересылаемых заголовков запросов
            /// Указывает, что должны обрабатываться заголовки X-Forwarded-For и X-Forwarded-Proto. 
            /// Эти заголовки обычно используются в конфигурациях с реверс-прокси серверами для передачи информации о оригинальном запросе.
            /// </summary>
            /// <param name="options"></param>
            services.Configure<ForwardedHeadersOptions>(option =>
                option.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto);
                
        }

        // Взаимодействие с .NET CORE проходит через HTTP запросы, прежде чем дойти до Controller , запросы проходят через middleware.
        // Middleware работают как фильтры где выполняется различная проверка на разную валидность, валидность зависит от требований.  
        // Здесь определяется какие связующие программные компоненты и для какой среды, будут использоваться в данном приложении.
        // Без которых не работало бы наше приложение. 
        // Также здесь определяються контроллеры. 
        public void Configure(IApplicationBuilder applicationBuilder)
        {
            //applicationBuilder.UseHttpsRedirection();
            // !!! Добавляем в конвеер обработки HTTP-запроса компонент работы с пересылаемыми заголовками
            applicationBuilder.UseForwardedHeaders();
            applicationBuilder.UseStaticFiles();

            applicationBuilder.UseCors("AllowSpecificOrigin");

            applicationBuilder.UseRouting();
            applicationBuilder.UseAntiforgery();

            applicationBuilder.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
}