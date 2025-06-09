// 함수
// 한쪽 끝에는 함수 인수가 있고, 다른 쪽 끝에는 반환 타입이 있습니다.

// 1. 함수 매개변수
// sing 함수를 작성한 개발자가 song 매개변수를 제공하기 위해 의도한 값의 타입은 무엇일까요?
// 명시적 타입 정보가 선언되지 않으면 절대 타입을 알 수 없습니다. 타입스크립트가 이를 any 타입으로 간주하며 매개변수의 타입은 무엇이든 될 수 있습니다.

function sing1(song) {
    console.log(`Singing: ${song}!`);
}

function sing2(song: string) {
    console.log(`Singing: ${song}!`);
}

// ====================================================================================================

// 1.1 필수 매개변수
// 자바스크립트에서는 인수의 수와 상관없이 함수를 호출할 수 있습니다. 하지만 타입스크립트는 함수에 선언된 모든 매개변수가 필수라고 가정합니다.

function sing3(first: string, second: string) {
    console.log(`${first} | ${second}`);
}

sing3("첫 번째 인수"); // 2개의 인수가 필요한데 1개를 가져왔습니다.
sing3("첫 번째 인수", "두 번째 인수"); // OK
sing3("첫 번째 인수", "두 번째 인수", "세 번째 인수"); // 2개의 인수가 필요한데 3개를 가져왔습니다.

// 매개변수는 인수로 받은 것으로 예상되는 함수의 선언을 나타냅니다.
// 인수는 함수를 호출할 때 매개변수에 제공되는 값을 나타냅니다.

function fn(x: string, y: string, z: string) {
    console.log("x:", x);
    console.log("y:", y);
    console.log("z:", z);
}
// 위 함수에서 x, y, z는 매개변수라고 하고

fn("G-Dragon", "태양", "TOP"); // => GD, 태양, TOP은 인자라고 합니다.

// ====================================================================================================

// 1.2 선택적 매개변수
// 자바스크립트에서 함수 매개변수가 제공되지 않으면 함수 내부의 인수값은 undefined으로 기본값이 설정된다는 것을 떠올려보세요.
// 때로는 함수 매개변수를 제공할 필요가 없을 때 있고, undefined 값을 위해 의도적으로 사용할 수도 있습니다.
// 타입스크립트가 이러한 선택적 매개변수에 인수를 제공하지 못하는 경우, 타입 오류를 보고하지 않았으면 할 때도 있습니다.
// 타입스크립트에서는 선택적 객체 타입 속성과 유사하게 타입 애너테이션의 : 앞에 ?를 추가해 매개변수가 선택적이라고 표시합니다.
// 선택적 매개변수에는 항상 | undefined가 유니언 타입으로 추가되어 있습니다.

function announceSong(song: string, singer?: string) {
    console.log(`Song: ${song}`);

    if (singer) {
        console.log(`Singer: ${singer}`);
    }
}

announceSong("봄여름가을겨울"); // OK
announceSong("BAEBAE", undefined); // OK
announceSong("거짓말", "하루하루"); // OK

// 선택적 매개변수는 항상 암묵적으로 undefined가 될 수 있습니다.
// 선택적 매개변수는 | undefined를 포함하는 유니언 타입 매개변수와는 다릅니다.
// ?으로 표시된 선택적 매개변수가 아닌 매개변수는 값이 명시적으로 undefined일지라도 항상 제공되어야 합니다.

function announceSongBy(song: string, singer: string | undefined) {
    console.log(`Song: ${song}`);

    if (singer) {
        console.log(`Singer: ${singer}`);
    }
}

announceSongBy("봄여름가을겨울"); // 2개의 인수가 필요한데 1개를 가져왔습니다.
announceSongBy("BAEBAE", undefined); // OK
announceSongBy("거짓말", "하루하루"); // OK

// 함수에서 사용되는 모든 선택 매개변수는 마지막 매개변수여야 합니다.

function announceSinger(singer?: string, song: string) {} // 필수 매개 변수는 선택적 매개 변수 뒤에 올 수 없습니다.

// ====================================================================================================

// 1.3 나머지 매개변수
// ... 스프레드 연산자는 함수 선언의 마지막 매개변수에 위치하고, 해당 매개변수에서 시작해 함수에 전달된 '나머지' 인수가 모두 단일 배열에 저장되어야 함을 나타냅니다.

function singAllTheSongs(singer: string, ...songs: string[]) {
    for (const song of songs) {
        console.log(`${song}, by ${singer}`);
    }
}
singAllTheSongs("Alicia Keys");
singAllTheSongs("Lady Gaga", "Bad Romance", "Just Dance", "Poker Face");
singAllTheSongs("Ella Fitzgerald", 2000); // 'number' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다.

// ====================================================================================================

// 2. 반환 타입
// 타입스크립트는 지각적(perceptive)입니다. 함수가 반환할 수 있는 가능한 모든 값을 이해하면 함수가 반환하는 타입을 알 수 있습니다.
// 아래 예제에서 getUsers는 타입스크립트에서 number를 반환하는 것으로 파악됩니다.

function getUsers(users: string[]) {
    for (const user of users) {
        console.log(`${user}`);
    }
    return users.length;
}

// 다음 예제에서 getSongAt 함수는 string | undefined를 반환하는 것으로 유추합니다.
function getSongAt(songs: string[], index: number) {
    return index < songs.length ? songs[index] : undefined;
}

// 2.1 명시적 반환 타입
// 변수와 마찬가지로 타입 애너테이션을 사용해 함수의 반환 타입을 명시적으로 선언하지 않는 것이 좋습니다.
// 그러나 특히 함수에서 반환 타입을 명시적으로 선언하는 방식이 매우 유용할 때가 종종 있습니다.

// 함수 선언 반환 타입 애너테이션은 매개변수 목록이 끝나는 ) 다음에 배치됩니다. 함수 선언의 경우는 { 앞에 배치됩니다.

function getTopics(topics: string[], count = 0): number {
    return topics.length ? getTopics(topics.slice(1), count + 1) : count;
}

// 화살표 함수의 경우 => 앞에 배치됩니다.
const getPosts = (posts: string[], count = 0): number => {
    return posts.length ? getTopics(posts.slice(1), count + 1) : count;
};

// 함수의 반환문이 함수의 반환 타입으로 할당할 수 없는 값을 반환하는 경우 타입스크립트는 할당 가능성 오류를 표시합니다.

function returnString(param: number): string | undefined {
    switch (param) {
        case 1:
            return undefined;
        case 2:
            return "";
        case 3:
            return 0;
        default:
            return undefined;
    }
}

// ====================================================================================================

// 3. 함수 타입
// 자바스크립트에서는 함수를 값으로 전달할 수 있습니다.
// 즉, 함수를 가지기 위한 매개변수 또는 변수의 타입을 선언하는 방법이 필요합니다.
// 함수 타입 구문은 화살표 함수와 유사하지만 함수 본문 대신 타입이 있습니다.

let fn: () => string;

// 위 fn 변수 타입은 매개변수가 없고, string 타입을 반환하는 함수임을 설명합니다.
// 다음 inputAndOutput 변수 타입은 string[] 매개변수와 count 선택적 매개변수 및 number 값을 반환하는 함수임을 설명합니다.

let inputAndOutput: (values: string[], count?: number) => number;

// 함수 타입은 콜백 매개변수(함수로 호출되는 매개변수)를 설명하는 데 자주 사용됩니다.

const users = ["김아무개", "이아무개", "박아무개"];

function findUser(getUserAt: (index: number) => string) {
    for (let i = 0; i < users.length; i++) {
        console.log(getUserAt(i));
    }
}

function getUserAt(index: number) {
    return `${users[index]}`;
}
findUser(getUserAt); // OK

function logUser(user: string) {
    return `${user}`;
}
findUser(logUser); // Error: '(user: string) => string' 형식의 인수는 '(index: number) => string' 형식의 매개 변수에 할당될 수 없습니다.

// 3.1 함수 타입 괄호
// 함수 타입은 다른 타입이 사용되는 모든 곳에 배치할 수 있습니다. 여기에는 유니언 타입도 포함됩니다.
// 유니언 타입의 애너테이션에서 함수를 반환 위치를 나타내거나 유니언 타입을 감싸는 부분을 표시할 때 괄호를 사용합니다.

// 타입은 string | undefined 유니언을 반환하는 함수
let returnStringOrUndefined: () => string | undefined;

// 타입은 undefined나 string을 반환하는 함수
let maybeReturnsString: (() => string) | undefined;

// 3.2 매개변수 타입 추론
// 매개변수로 사용되는 인라인 함수를 포함하여 작성한 모든 함수에 대해 매개변수를 선언해야 한다면 번거로울 것입니다.
// 다행히도 타입스크립트는 선언된 타입의 위치에 제공된 함수의 매개변수 타입을 유추할 수 있습니다.

let singer: (song: string) => string;

// 아래 singer 변수는 string 타입의 매개변수를 갖는 함수로 알려져 있으므로 singer가 할당되는 함수 내의 song 매개변수는 string으로 예측됩니다.
singer = function (song) {
    return `Singing: ${song.toUpperCase()}`; // OK
};

// 함수를 매개변수로 갖는 함수에 인수로 전달된 함수는 해당 매개변수 타입도 잘 유추할 수 있습니다.
// 예를 들어, 다음 user와 index 매개변수는 타입스크립트에 따라 각각 string, number로 유추됩니다.

const users = ["김아무개", "이아무개", "박아무개"];

users.forEach((user, index) => {
    console.log(`${user} is at index ${index}`);
});

// 3.3 함수 타입 별칭
// 함수 타입에서도 동일하게 타입 별칭을 사용할 수 있습니다.

type StringToNumber = (input: string) => number;

let stringToNumber: StringToNumber;
stringToNumber = (input) => input.length; // OK
stringToNumber = (input) => input.toUpperCase(); // Error: 'string' 형식은 'number' 형식에 할당할 수 없습니다.

// 3.4 void 반환 타입과 never 반환 타입
// 일부 함수는 어떤 값도 반환하지 않습니다. 예를 들어 return 문이 없는 함수이거나 값을 반환하지 않는 return 문을 가진 함수일 경우입니다.
// 타입스크립트 void 키워드를 사용해 반환 값이 없는 함수의 반환 타입을 확인할 수 있습니다.

function findUser(user: string | undefined): void {
    if (!user) return;
    console.log(`Find User: ${user}`);

    return true; // Error: 'boolean' 형식은 'void' 형식에 할당할 수 없습니다.
}

// 자바스크립트 함수는 실젯값이 반환되지 않으면 기본적으로 모두 undefined를 반환하지만 void와 undefined는 동일하지 않습니다.
// void는 함수의 반환 타입이 무시된다는 것을 의미하고, undefined는 반환되는 리터럴 값입니다.
// undefined를 포함하는 대신 void 타입의 값을 할당하려고 하며 타입 오류가 발생합니다.

// never 반환 함수는 (의도적으로) 항상 오류를 발생시키거나 무한 루프를 실행하는 함수입니다.
// 함수가 절대 반환하지 않도록 의도하려면 명시적 : never 타입 애너테이션을 추가해 해당 함수를 호출한 후 모든 코드가 실행되지 않음을 나타냅니다.

function fail(message: string): never {
    throw new Error(`알 수 없는 오류 발생: ${message}`);
}

function workWithUnsafeParam(param: unknown) {
    if (typeof param !== "string") {
        fail("Param의 데이터 타입은 문자열(string)이어야 합니다.");
    }

    // 여기서 param의 타입은 string으로 알려집니다.
    param.toUpperCase();
}
