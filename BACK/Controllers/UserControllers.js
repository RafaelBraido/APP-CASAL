import UserServices from "../Services/UserServices.js";

const updateMe = async (req, res, next) => {
  try {
    const user = await UserServices.updateMe({ id: req.user.id, ...req.body });
    res.status(200).json({ message: "Usuário atualizado com sucesso", data: user });
  } catch (error) {
    next(error);
  }
};

const DeleteMe = async (req, res, next) => {
  try {
    await UserServices.DeleteMe({ id: req.user.id });
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserServices.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export default {
  updateMe,
  DeleteMe,
  getAllUsers,
};