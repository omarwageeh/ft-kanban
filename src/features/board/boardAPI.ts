export async function fetchList(boardId: string, setList: Function) {
  try {
    const response = await fetch(
      `https://api.trello.com/1/boards/${boardId}/lists?key=d24452340ed920b2ef39bc3bcb2e0c55&token=ATTAc6e3c5635737b7e1c81e3f7c592b38101e9d80d29add76a89073726230a7f3b5EDCDD205`
    );
    const ret = await response.json();
    setList(ret);
  } catch (e) {
    console.log(e);
  }
}
export async function fetchCards(boardId: string, setCards: Function) {
  try {
    const response = await fetch(
      `https://api.trello.com/1/boards/${boardId}/cards?key=d24452340ed920b2ef39bc3bcb2e0c55&token=ATTAc6e3c5635737b7e1c81e3f7c592b38101e9d80d29add76a89073726230a7f3b5EDCDD205`
    );
    const ret = await response.json();
    setCards(ret);
  } catch (e) {
    console.log(e);
  }
}
