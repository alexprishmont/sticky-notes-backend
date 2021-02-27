import { IFilter } from '../interfaces/filter';

const getQueryOperator = (operator: string, value: any): object => {
  if (operator === 'EQ') {
    return { $eq: value };
  }

  if (operator === 'IN') {
    return { $in: value };
  }

  if (operator === 'LIKE') {
    return { $regex: `.*${value}.*` };
  }

  if (operator === 'GE') {
    return { $gte: value };
  }

  return {};
};

export const buildFilters = async (filter: IFilter): Promise<object> => {
  if (!filter) {
    return {};
  }

  const buildedFilter = filter.operator === 'AND' ? { $and: [] as any } : { $or: [] as any };

  filter.filters.forEach((filter) => {
    const { op, values, field } = filter;
    const obj = buildedFilter.$and ? buildedFilter.$and : buildedFilter.$or;

    if (op === 'IN') {
      obj.push(
        {
          [field]: getQueryOperator(op, values),
        },
      );
      return;
    }

    values.forEach((value) => {
      obj.push(
        {
          [field]: getQueryOperator(op, value),
        },
      );
    });
  });

  return buildedFilter;
};
