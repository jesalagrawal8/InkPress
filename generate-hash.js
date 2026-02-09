const bcrypt = require("bcryptjs");
const password = "admin123";
const hash = bcrypt.hashSync(password, 10);
console.log("\n=== PASSWORD HASH FOR MONGODB ===");
console.log(hash);
console.log("\n");
