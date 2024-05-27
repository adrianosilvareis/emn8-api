import { departmentRouters } from "./department/main";
import { employeeRouters } from "./employees/main";
import { app } from "./express.config";

departmentRouters(app);
employeeRouters(app);

const $PORT = process.env.PORT || 5000;

app.listen($PORT, () => {
  console.log(`Server is running on port ${$PORT}`);
});
