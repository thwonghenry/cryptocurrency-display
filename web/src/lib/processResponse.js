export default async (res) => {
    if (!res.ok) {
        throw res;
    }
    try {
        const data = await res.json();
        if (res.ok) {
            return data;
        } else {
            throw data.meta;
        }
    } catch (error) {
        throw error;
    }
};