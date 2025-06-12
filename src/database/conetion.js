import sql from 'mssql';


const dbsetings = {

    user: "sistemas",
    password: "12345",
    server: "DESKTOP-4D33T94\\SQLEXPRESS",
    database: "webstore",
    options: {
        encrypt: false, // Use encryption if required
        trustServerCertificate: true, // Change to false in production
    }

};


export const getConection = async () => {

    try {
        
        const poll = await sql.connect(dbsetings);
        
        return poll;

     } catch (error) {
        
        console.error("Error conectando la base de datos:", error);

    }

}

