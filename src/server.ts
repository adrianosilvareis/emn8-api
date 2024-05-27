import { departmentRouters } from "./department/main";
import { app, router } from "./express.config";

app.use("/department", departmentRouters(router));

const $PORT = process.env.PORT || 5000;

app.listen($PORT, () => {
  console.log(`Server is running on port ${$PORT}`);
});
