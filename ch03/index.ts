// 1. 객체 타입
// { ... } 구문을 사용해서 객체 리터럴을 생성하면, 타입스크립트는 해당 속성을 기반으로 새로운 객체 타입 또는 타입 형태를 고려합니다.
// 해당 객체 타입은 객체의 값과 동일한 속성명과 원시 타입을 갖습니다.

const poet = {
    born: 1935,
    name: "개발자 9Diin",
};
poet["born"]; // 타입: number
poet.name; // 타입: string
poet.nationality; // Error: '{ born: number; name: string; }' 형식에 'nationality' 속성이 없습니다.

// 1.1 객체 타입 선언
// 기존 객체에서 직접 타입을 유추하는 방법도 굉장히 좋지만, 결국에는 객체의 타입을 명시적으로 선언하고 싶습니다.
// 명시적으로 타입이 선언된 객체에는 별도로 객체의 형태를 설명하는 방법이 필요합니다.

let author: {
    born: number;
    name: string;
};
author = {
    born: 1935,
    name: "Mary Oliver",
};
author = "Hello, World!"; // Error: 'string' 형식은 '{ born: number; name: string; }' 형식에 할당할 수 없습니다.

// 1.2 별칭 객체 타입
// { born: number, name: string }과 같은 객체 타입을 계속 작성하는 것은 매우 귀찮습니다.
// 각 객체 타입에 타입 별칭을 할당해 사용하는 방법이 더 일반적입니다.

type Poet = {
    born: number;
    name: string;
};

let poetLater: Poet;
poetLater = {
    born: 1935,
    name: "Mary Oliver",
};
poetLater = "Hello, world!"; // Error: 'string' 형식은 'Poet' 형식에 할당할 수 없습니다.

// ====================================================================================================

// 2. 구조적 타이핑
// 타입스크립트의 타입 시스템은 구조적으로 타입화(structurally typed) 되어 있습니다.
// 즉, 타입을 충족하는 모든 값을 해당 타입의 값으로 사용할 수 있습니다.
// 매개변수나 변수가 특정 객체 타입으로 선언되면, 타입스크립트에 어떤 객체를 사용하든 핵당 속성이 있어야 한다고 말해야 합니다.

type WithFirstName = {
    firstname: string;
};

type WithLastName = {
    lastname: string;
};

const hasBoth = {
    firstname: "구디사는 개발자",
    lastname: "9Diin",
};

let withFirstName: WithFirstName = hasBoth; // OK: 'hasBoth'는 'string' 타입의 'firstname'을 포함하고 있다.
let withLastName: WithLastName = hasBoth; // OK: 'hasBoth'는 'string' 타입의 'lastname'을 포함하고 있다.

// 2.1 사용 검사
type FirstAndLastNames = {
    first: string;
    last: string;
};

const firstAndLastNames: FirstAndLastNames = {
    first: "구디사는 개발자",
    last: "9Diin",
};

// Error: 'last' 속성이 '{ first: string; }' 형식에 없지만 'FirstAndLastNames' 형식에서 필수입니다.
const hasOnlyOne: FirstAndLastNames = {
    first: "Sappho",
};

type TimeRange = {
    start: Date;
};

const hasStartString: TimeRange = {
    start: "1879-02-13", // Error: 'string' 형식은 'Date' 형식에 할당할 수 없습니다.
};

// 2.2 초과 속성 검사
type Poet = {
    born: number;
    name: string;
};

// OK: Poet의 필드와 일치함
const poetMatch: Poet = {
    born: 1928,
    name: "Maya Angelou",
};

// Error: 개체 리터럴은 알려진 속성만 지정할 수 있으며 'Poet' 형식에 'activity'이(가) 없습니다.
const extraProperty: Poet = {
    born: 1928,
    name: "Maya Angelou",
    activity: "walking",
};

// 2.3 중첩된 객체 타입
type Poem = {
    author: {
        firstname: string;
        lastname: string;
    };
    name: string;
};

// OK
const poemMatch: Poem = {
    author: {
        firstname: "Sylvia",
        lastname: "Plath",
    },
    name: "Lady Lazarus",
};

const poemMismatch: Poem = {
    author: {
        name: "Sylvia Plath",
    },
    name: "Lady Lazarus",
};

// 타입 변경
type Author = {
    firstname: string;
    lastname: string;
};

type Poem = {
    author: Author;
    name: string;
};

// 2.4 선택적 속성
// 모든 객체에 객체 타입 속성이 필요한 건 아닙니다. 타입의 속성 애너테이션에서 : 앞에 ?를 추가하면 선택적 속성임을 나타낼 수 있습니다.

type Book = {
    author?: string;
    pages: number;
};

// OK
const ok: Book = {
    author: "개발자 9Diin",
    pages: 80,
};

const missing: Book = { author: "개발자 9Diin" }; // Error: 'pages' 속성이 '{ author: string; }' 형식에 없지만 'Book' 형식에서 필수입니다.

type Writers = {
    author: string | undefined;
    editor?: string;
};

// OK: author는 undefined으로 제공
const hasRequired: Writers = {
    author: undefined,
};

const missingRequired: Writers = {}; // Error: 'author' 속성이 '{}' 형식에 없지만 'Writers' 형식에서 필수입니다.

// 선택적 속성과 undefined를 포함한 유니언 타입의 속성 사이에는 차이가 있음을 명심하세요.
// ?를 사용해 선택적으로 선언된 속성은 존재하지 않아도 됩니다.
// 필수로 선언된 속성과 | undefined는 그 값이 undefined 일지라도 반드시 존재해야 합니다.

// ====================================================================================================

// 3. 객체 타입 유니언
// 타입스크립트 코드에서는 속성이 조금 다른, 하나 이상의 서로 다른 객체 타입이 될 수 있는 타입을 설명할 수 있어야 합니다.
// 또한 속성값을 기반으로 해당 객체 타입 간에 타입을 좁혀야 할 수도 있습니다.

// 3.1 유추된 객체 타입 유니언
// 변수에 여러 객체 타입 중 하나가 될 수 있는 초깃값이 주어지면 타입스크립트는 해당 타입을 객체 타입 유니언으로 유추합니다.
// 유니언 타입은 가능한 각 객체 타입을 구성하고 있는 요소를 모두 가질 수 있습니다.

const poem: Poem2 =
    Math.random() > 0.5
        ? {
              name: "The Double Image",
              pages: 7,
          }
        : {
              name: "Her Kind",
              rhymes: true,
          };

poem.name; // string
poem.pages; // number | undefined
poem.rhymes; // boolean | undefined

// 이 경우 타입은 어떻게 될까요?
// 아래 선언한 PoemWithPages과 PoemWithRhymes 둘 중 하나가 되겠죠?

type PoemWithPages = {
    name: string;
    pages: number;
};

type PoemWithRhymes = {
    name: string;
    rhymes: boolean;
};

type Poem2 = PoemWithPages | PoemWithRhymes;

// 3.2 교차 타입
// 타입스크립트 유니언 타입은 둘 이상의 다른 타입 중 하나의 타입이 될 수 있음을 나타냅니다.
type Artwork = {
    genre: string;
    name: string;
};

type Writing = {
    pages: number;
    name: string;
};

type WrittenArt = Artwork | Writing;
// type WrittenArt = {
//     genre: string;
//     pages: number;
//     name: string;
// };
