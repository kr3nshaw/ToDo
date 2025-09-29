using ToDoApi.Models;
using ToDoApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<Service>();

builder.Services.AddCors();

var app = builder.Build();

app.UseCors(policy => policy
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
);

app.MapGet("/api/todo/", (Service service) =>
{
    return Results.Ok(service.GetItems());
});

app.MapGet("/api/todo/{id}", (int id, Service service) =>
{
    var item = service.GetItemById(id);

    return item is not null ? Results.Ok(item) : Results.NotFound();
});

app.MapPost("/api/todo", (Item item, Service service) =>
{
    var newItem = service.Add(item);

    return Results.Created($"/api/todo/{newItem.Id}", newItem);
});

app.MapDelete("/api/todo/{id}", (int id, Service service) =>
{
    return service.Delete(id) ? Results.NoContent() : Results.NotFound();
});

app.Run();
