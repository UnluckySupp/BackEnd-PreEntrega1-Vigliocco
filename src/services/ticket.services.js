import ticketRepository from '../persistence/mongoDB/ticket.repository.js';

export const createTicket = async (total, email) => {
  try {
    const newUser = {
      purchaser: email,
      code: Math.random().toString(36).substr(2, 9),
      amount: total,
    };
    return await ticketRepository.createTicket(newUser);
  } catch (error) {
    throw new Error(error);
  }
};
