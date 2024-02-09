export class LimitPages{
static async limitPage(limit: number | string, page: number | string) {   
    const parsedLimit = typeof limit === 'string' ? parseInt(limit, 10) : limit;
    const parsedPage = typeof page === 'string' ? parseInt(page, 10) : page;   
    const offset = (parsedPage - 1) * parsedLimit;
    return {
      limit: parsedLimit,
      offset,
    };
  }  
}


