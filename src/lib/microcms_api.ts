import useSWR from "swr";

const fetcher = async (url: string) => {
    const res = await fetch(url, {
        headers: {"X-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY! },
    });

    return res.json();
};

export const useArticles = () => {
    const { data, error } = useSWR(
        `https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/articles`,
        fetcher,
    );

    return {
        articles: data?.contents,
        error
    }
}

export const useArticle = (id: string) => {
    const { data, error } = useSWR(
        `https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/articles/${id}`,
        fetcher,
    );

    return {
        article: data,
        error
    }
}

export async function fetchArticles() {
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/articles`, {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY!,
      },
    });
    return res.json();
}
  
  export async function fetchArticleById(id: string) {
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/articles/${id}`, {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY!,
      },
    });
    return res.json();
}
