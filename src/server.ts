import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, {
    origin: "*",
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type"],
    // exposedHeaders: ["Content-Type"]
    });

const teams = [
    { id: 1, name: "McLaren", base: "Woking, United Kingdon" },
    { id: 2, name: "Mercedes", base: "Brackley, United Kingdon" },
    { id: 3, name: "Ferrari", base: "Maranello, Italy" },
    { id: 4, name: "Red Bull Racing", base: "Milton Keynes, United Kingdon" },
    { id: 5, name: "Alpine", base: "Enstone, United Kingdon" },
    { id: 6, name: "AlphaTauri", base: "Faenza, Italy" },
    { id: 7, name: "Aston Martin", base: "Silverstone, United Kingdon" },
    { id: 8, name: "Williams", base: "Grove, United Kingdon" },
    { id: 9, name: "Alfa Romeo Racing", base: "Hinwil, Switzerland" },
    { id: 10, name: "Haas F1 Team", base: "Kannapolis, United States" },
    { id: 11, name: "Uralkali Haas F1 Team", base: "Kannapolis, United States" },
    ];

    const drivers = [
        { id: 1, name: "Hamilton", team: "Mercedes" },
        { id: 2, name: "Bottas", team: "Mercedes" },
        { id: 3, name: "Verstappen", team: "Red Bull Racing" },
        { id: 4, name: "Perez", team: "Red Bull Racing" },
        { id: 5, name: "Leclerc", team: "Ferrari" },
        { id: 6, name: "Sainz", team: "Ferrari" },
        { id: 7, name: "Ricciardo", team: "McLaren" },
        { id: 8, name: "Norris", team: "McLaren" },
        { id: 9, name: "Alonso", team: "Alpine" },
        { id: 10, name: "Ocon", team: "Alpine" },
        { id: 11, name: "Gasly", team: "AlphaTauri" },
        { id: 12, name: "Tsunoda", team: "AlphaTauri" },
        { id: 13, name: "Vettel", team: "Aston Martin" },
        { id: 14, name: "Stroll", team: "Aston Martin" },
        { id: 15, name: "Raikkonen", team: "Alfa Romeo Racing" },
        { id: 16, name: "Giovinazzi", team: "Alfa Romeo Racing" },
        { id: 17, name: "Russell", team: "Williams" },
        { id: 18, name: "Latifi", team: "Williams" },
        { id: 19, name: "Schumacher", team: "Haas F1 Team" },
        { id: 20, name: "Mazepin", team: "Haas F1 Team" },
        { id: 21, name: "Schumacher", team: "Uralkali Haas F1 Team" },
        { id: 22, name: "Mazepin", team: "Uralkali Haas F1 Team" },
        ];

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);
  return { teams };
});

server.get("/drivers", async (request, response) => {
    response.type("application/json").code(200);
    return { drivers };
    });

interface DriverParams {
    id: string;
}   

server.get<{Params: DriverParams}>("/drivers/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id);

    if(!driver) {
        response.type("application/json").code(404);
        return { error: "Driver not found" };
    }else{
        response.type("application/json").code(200);
        return { driver };
    }
});

server.listen({port:3333}, () => {
    console.log("Server init");
});

