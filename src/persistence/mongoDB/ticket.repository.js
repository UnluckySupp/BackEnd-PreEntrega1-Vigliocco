import { ticketModel } from './models/ticket.model.js';

const createTicket = async data => {
  return await ticketModel.create(data);
};

const updateTicket = async () => {
  return await ticketModel.findByIdAndUpdate();
};

const findTicket = async () => {
  return await ticketModel.findById();
};

const deleteTicket = async () => {
  return await ticketModel.deleteById();
};

export default {
  createTicket,
  updateTicket,
  findTicket,
  deleteTicket,
};
