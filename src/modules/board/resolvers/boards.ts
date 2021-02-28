import { Board } from '../../../models/board';
import { User } from '../../../models/user';
import { buildFilters } from '../../../utils/filters';
import { getUserIds, setUsersData } from '../../../utils/user';

export const boards = async (parent: any, ctx: any): Promise<any> => {
  let { filter, page, limit } = ctx;
  const filtering = await buildFilters(filter);

  if (!page) { page = 1; }
  if (!limit) { limit = 20; }

  try {
    const boards = await Board.find(filtering).limit(limit).skip((page - 1) * limit).lean();
    const count = await Board.countDocuments(filtering);

    const users = await User.find({
      _id: { $in: getUserIds(boards) },
    });

    return {
      board: setUsersData(boards, users),
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  } catch (error) {
    throw error;
  }
};
