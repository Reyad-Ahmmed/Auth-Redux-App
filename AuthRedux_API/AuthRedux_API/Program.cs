using AuthRedux_API.Helpers;
using AuthRedux_API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
var builder = WebApplication.CreateBuilder(args);

var key = builder.Configuration["Jwt:Key"];
if (Encoding.UTF8.GetBytes(key).Length < 32)
    throw new Exception("JWT key must be at least 256 bits (32 bytes).");

// 🔐 JWT Configuration
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
        };
    });

// 🌐 CORS Configuration (allow React frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000") // React dev server
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

// 🧠 Custom Services
builder.Services.AddSingleton<UserService>();
builder.Services.AddScoped<JwtHelper>();

// 📦 Add Controllers and Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 🧪 Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 🔄 Middleware Pipeline
app.UseCors("AllowReactApp");         // Enable CORS
app.UseAuthentication();              // Enable JWT auth
app.UseAuthorization();               // Enable authorization

app.MapControllers();                 // Map API controllers

app.Run();

