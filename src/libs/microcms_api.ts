import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY! },
  });

  return res.json();
};

export const useArticles = () => {
  const { data, error } = useSWR(
    `https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/articles`,
    fetcher
  );

  return {
    articles: data?.contents,
    error,
  };
};

export const useArticle = (id: string) => {
  const { data, error } = useSWR(
    `https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/articles/${id}`,
    fetcher
  );

  return {
    article: data,
    error,
  };
};

export async function fetchArticles(
  options: { limit?: number; offset?: number; filters?: string } = {}
) {
  const { limit = 10, offset = 0, filters } = options;
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  if (filters) {
    params.append('filters', filters);
  }

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/articles?${params.toString()}`,
    {
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY!,
      },
    }
  );
  return res.json();
}

export async function fetchArticleById(id: string) {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/articles/${id}`,
    {
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY!,
      },
    }
  );
  return res.json();
}

export const useTags = () => {
  const { data, error } = useSWR(
    `https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/tags`,
    fetcher
  );

  return {
    tags: data?.contents,
    error,
  };
};

export async function fetchTags() {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/tags`,
    {
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY!,
      },
    }
  );
  return res.json();
}

export const useCategories = () => {
  const { data, error } = useSWR(
    `https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/categories`,
    fetcher
  );

  return {
    categories: data?.contents,
    error,
  };
};

export async function fetchCategories() {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/categories`,
    {
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY!,
      },
    }
  );
  return res.json();
}
