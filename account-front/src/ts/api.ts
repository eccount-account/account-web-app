//서버에 있는 데이터 패칭하기
interface PostOption {
    method: string;
    headers: object | any;
    body: string;
}

export async function fetchData(url: string) {
    const response = await fetch(url);
    const dataList = await response.json();

    if (!dataList) {
        return dataList;
    }
    return dataList;
}

//클라이언트에서 서버로 데이터 전송
export async function saveData(url: string, bodyData: string) {
    const requstOption: PostOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: bodyData,
    };

    await fetch(url, requstOption);
}
