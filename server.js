/* server.js in root directory */
const fs = require('fs');
const path = require('path');

const dir = "src/environments";
const prodFile = "environment.prod.ts"; // For production deployment

const content = `${process.env.PRODUCTION_DETAILS}`;

fs.access(dir, fs.constants.F_OK, (err) => {
    if (err) {
        // Directory doesn't exist
        console.log("src no existe, creandolo ahora", process.cwd());
        // Create /src
        try {
            fs.mkdirSync(dir, { recursive: true });
        }
        catch (error) {
            console.log(`Error error mientras se creaba ${dir}. El Error es ${error}`);
            process.exit(1);
        }
    }
    // Now write to prodFile
    try {
        fs.writeFileSync(dir + "/" + prodFile, content);
        console.log("Creado satisfactoriamente en", process.cwd());
        if (fs.existsSync(dir + "/" + prodFile)) {
            console.log("Archivo fue creado", path.resolve(dir + "/" + prodFile));
            const str = fs.readFileSync(dir + "/" + prodFile).toString();
            console.log(str);
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
});