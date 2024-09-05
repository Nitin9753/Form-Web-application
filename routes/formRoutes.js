const { getAllForms, createForm, getFormById, updateFormById, deleteFormById } = require("../controllers/formControllers");

const formRouter=require("express").Router();

formRouter.get("/forms", getAllForms);
formRouter.post('/forms', createForm);
formRouter.get("/forms/:id", getFormById);
formRouter.put("/forms/:id", updateFormById);
formRouter.delete("/forms/:id", deleteFormById);
module.exports=formRouter;
