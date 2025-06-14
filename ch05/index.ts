// 배열
// 자바스크립트 배열은 매우 유연하고 내부에 모든 타입의 값을 혼합해서 저장할 수 있습니다.
// 그러나 대부분의 개별 자바스크립트 배열은 하나의 특정 타입의 갓만 가집니다. 다른 타입의 값을 추가하게 되면 배열을 읽을 때 혼란을 줄 수 있으며,
// 최악의 상황으로는 프로그램에 문제가 될 만한 오류가 발생할 수도 있습니다.

// 타입스크립트는 초기 배열에 어떤 데이터 타입이 있는지 기억하고, 배열이 해당 데이터 타입에서만 작동하도록 제한합니다.
// 이런 방식으로 배열의 데이터 타입을 하나로 유지시킵니다.

// 다음 예제에서 타입스크립트는 users 배열이 초기에 string 타입의 값을 포함한다는 것을 알고 있으므로 이후 string 타입의 값 추가는 허용하지만
// 다른 데이터 타입 추가는 허용하지 않습니다.

const users = ["김아무개", "이아무개", "박아무개"];

users.push("최아무개"); // OK: "최아무개"의 타입은 string
users.push(true); // 'boolean' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다.

// 타입스크립트가 초기 배열에 담긴 요소를 통해 배열의 타입을 유추하는 방법은 변수의 초깃값에서 변수 타입을 유추하는 방법과 유사합니다.
// 타입스크립트는 값이 할당되는 방식에서 코드의 의도된 타입을 이해하려고 시도하며 배열도 예외는 아닙니다.

// 1. 배열 타입
// 배열에 대한 타입 애너테이션은 배열의 요소 타입 다음에 []가 와야 합니다.
let arrayOfNumbers: number[];
arrayOfNumbers = [1, 2, 3, 4, 5];

// 1.1 배열과 함수 타입
// 배열 타입은 함수 타입에 무엇이 있는지를 구별하는 괄호가 필요한 구문 컨테이너의 예입니다.
// 괄호는 애너테이션의 어느 부분이 함수 반환 부분이고 어느 부분이 배열 타입 묶음인지를 나타내기 위해 사용합니다.

// 타입은 string 배열을 반환하는 함수
let createStrings: () => string[];

// 타입은 각각의 string을 반환하는 함수 배열
let stringCreators: (() => string)[];

// 1.2 유니언 타입 배열
// 배열의 각 요소가 여러 선택 타입 중 하나일 수 있음을 나타내려면 유니언 타입을 사용합니다.

// 타입은 string 또는 number의 배열
let stringOrArrayOfNumbers: string | number[];

// 타입은 각각 number 또는 string인 요소의 배열
let arrayOfStringOrNumbers: (string | number)[];

// 타입: (string | undefined)[]
const optionalNames: (string | undefined)[] = ["김아무개", "이아무개", "박아무개", undefined];

// 1.3 any 배열의 진화
// 초기에 빈 배열로 설정된 변수에서 타입 애너테이션을 포함하지 않으면 타입스크립트는 배열을 any[]로 취급하고 모든 콘텐츠를 받을 수 있습니다.
// 하지만 any 변수가 변경되는 것처럼 any[] 배열이 변경되는 것도 좋지 않습니다.
// 타입 애너테이션이 없는 빈 배열은 잠재적으로 잘못된 값 추가를 허용해 타입스크립트의 타입 검사기가 갖는 이점을 부분적으로 무력화 시키기 때문입니다.

// 다음 예제는 values 배열은 any 요소를 갖고 시작해 string 요소를 포함하도록 바꾼 다음, 다시 number | string 요소로 바뀝니다.

// 타입: any[]
let values = [];

// 타입: string[]
values.push("");

// 타입: (number | string)[]
values[0] = 0;

// 만약 strictNullChecks와 noImplicitAny 컴파일러 옵션이 모두 활성화되어 있다면,
// 상황에 따라 never[]로 추론될 수도 있습니다.
// never[]는 "이 배열에는 어떤 종류의 값도 들어올 수 없다"는 의미로, 빈 배열 리터럴이 특정 컨텍스트에서 사용될 때
// TypeScript가 더 엄격하게 타입을 검사하려고 할 때 나타날 수 있습니다.

// 1.4 다차원 배열
// 2차원 배열 또는 배열의 배열은 두 개의 [](대괄호)를 갖습니다.
let arrayOfArrayOfNumbers: number[][]; // === (number[])[]
arrayOfArrayOfNumbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

// 2. 배열 멤버
// 타입스크립트는 배열의 멤버를 찾아서 해당 배열의 타입 요소를 되돌려주는 전형적인 인덱스 기반 접근 방식을 이해하는 언어입니다.
// 유니언 타입으로 된 배열의 멤버는 그 자체로 동일한 유니언 타입입니다.

const defenders = ["김아무개", "이아무개", "박아무개"];
const defender = defenders[0]; // 타입 string

const soldiersOrDates = ["김아무개", new Date(1782, 6, 3)];
const soldierOrDate = soldiersOrDates[0]; // 타입 string | Date

// 3. 스프레드와 나머지 매개변수
// 3.1 스프레드
// ... 스프레드 연산자를 사용해 배열을 결합합니다. 타입스크립트는 입력된 배열 중 하나의 값이 결과 배열에 포함될 것임을 이해합니다.
// 입력된 배열이 동일한 타입이라면, 출력 배열도 동일한 타입입니다. 서로 다른 타입의 두 배열을 함께 스프레드해 새 배열을 생성하면 새 배열은 두 개의 원래 타입 중 어느 하나의 요소인 유니언 타입 배열로 이해됩니다.

const soldiers = ["김아무개", "이아무개", "박아무개"]; // 타입 string[]
const soldierAges = [10, 20, 30]; // 타입 number[]
const conjoined = [...soldierAges, ...soldierAges]; // 타입 (string | number)[]

// 3.2 나머지 매개변수 스프레드
// 타입스크립트는 나머지 매개변수로 배열을 스프레드하는 자바스크립트 실행을 인식하고 이에 대해 타입 검사를 수행합니다.
// 나머지 매개변수를 위한 인수로 사용되는 배열은 나머지 매개변수와 동일한 배열 타입을 가져야 합니다.

function logWarriors(greeting: string, ...names: string[]) {
    for (const name of names) {
        console.log(`${greeting}, ${name}`);
    }
}
const warriors = ["김아무개", "이아무개", "박아무개"];
const birthYears = [1844, 1840, 1583];

logWarriors("Hello", ...warriors);
logWarriors("Born in", birthYears); // Error: 'number[]' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다.

// 4. 튜플
// 자바스크립트 배열은 이론상 어떤 크기라도 될 수 있습니다.
// 하지만 때로는 튜플Tuple이라고 하는 고정된 크기의 배열을 사용하는 것이 유용합니다.
// 튜플 배열은 각 인덱스에 알려진 특징 타입을 가지며 배열의 모든 가능한 멤버를 갖는 유니언 타입보다 더 구체적입니다.
// 튜플 타입을 선언하는 구문은 배열 리터럴처럼 보이지만 요소의 값 대신 타입을 적습니다.

let yearAndWarrior: [number, string];
yearAndWarrior = [530, "김아무개"]; // OK
yearAndWarrior = [false, "이아무개"]; // 'boolean' 형식은 'number' 형식에 할당할 수 없습니다.
yearAndWarrior = [1000]; // Error: '[number]' 형식은 '[number, string]' 형식에 할당할 수 없습니다. 소스에 1개 요소가 있지만, 대상에 2개가 필요합니다.

// 자바스크립트에서는 단일 조건을 기반으로 두 개의 변수에 초깃값을 설정하는 것처럼 한 번에 여러 값을 할당하기 위해 튜플과 배열 구조 분해 할당을 함께 자주 사용합니다.
let [year, warrior] = Math.random() > 0.5 ? [340, "김아무개"] : [1828, "박아무개"];

// 4.1 튜플 할당 가능성
// 타입스크립트에서 튜플 타입은 가변 길이의 배열 타입보다 더 구체적으로 처리됩니다. 즉, 가변 길이의 배열 타입은 튜플 타입에 할당할 수 없습니다.
// 다음 코드에서 우리는 pairLoose 내부에 [boolean, number]가 있는 것을 볼 수 있지만, 타입스크립트는 더 일반적인 (boolean, number)[] 타입으로 유추합니다.

const pairLoose = [false, 123];
const pairTupleLoose: [boolean, number] = pairLoose; // Error: '(number | boolean)[]' 형식은 '[boolean, number]' 형식에 할당할 수 없습니다. 대상에 2개 요소가 필요하지만, 소스에 더 적게 있을 수 있습니다.

// pairLoose가 [boolean, number] 자체로 선언된 경우 pairTupleLoose에 대한 값 할당이 허용되었을 것입니다.
// 하지만 타입스크립트는 튜플 타입의 튜플에 얼마나 많은 멤버가 있는지 알고 있기 때문에 길이가 다른 튜플은 서로 할당할 수 없습니다.

// 다음 tupleTwoExtra는 정확히 두 개의 멤버를 가져야 하므로 tupleThree가 올바른 멤버로 시작하더라도 세 번째 멤버는 tupbleTwoExtra에 할당할 수 없습니다.

const tupleThree: [boolean, number, string] = [false, 1592, "LEE"];
const tupleTwoExact: [boolean, number] = [tupleThree[0], tupleThree[1]];
const tupleTwoExtra: [boolean, number] = tupleThree; // Error: '[boolean, number, string]' 형식은 '[boolean, number]' 형식에 할당할 수 없습니다. 소스에 3개 요소가 있지만, 대상에서 2개만 허용합니다.

// 4.2 나머지 매개변수로서의 튜플
function logPair(name: string, value: number) {
    console.log(`${name} hase ${value}`);
}
const pairArray = ["Amage", 1]; // 타입: (string | number)[]
logPair(...pairArray); // Error: 확산 인수는 튜플 유형을 가지거나 나머지 매개 변수로 전달되어야 합니다.

const pairTupleIncorrect: [number, string] = [1, "Image"];
logPair(...pairTupleIncorrect); // Error: 'number' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다.

const pairTupleCorrect: [string, number] = ["Image", 1];
logPair(...pairTupleCorrect);

// 4.3 튜플 추론
// 타입스크립트는 생성된 배열을 튜플이 아닌 가변 길이의 배열로 취급합니다. 배열이 변수의 초깃값 또는 함수에 대한 반환값으로 사용되는 경우, 고정된 크기의 튜플이 아니라 유연하나 크기의 배열로 가정합니다.

function firstCharAndSize(input: string) {
    return [input[0], input.length]; // 반환 타입: (string | number)[]
}
const [firstChar, size] = firstCharAndSize("안녕하세요"); // firstChar의 타입: string | number, size의 타입: string | number

// 4.3.1 명시적 튜플 타입
// 함수에 대한 반환 타입 애너테이션처럼 튜플 타입도 타입 애너테이션에 사용할 수 있습니다.
// 함수가 튜플 타입을 반환한다고 선언되고, 배열 리터럴을 반환한다면 해당 배열 리터럴은 일반적인 가변 길이의 배열 대신 튜플로 간주합니다.

function firstCharAndSizeExplicit(input: string): [string, number] {
    return [input[0], input.length];
}
const [char, charSize] = firstCharAndSizeExplicit("안녕하세요");

// 4.3.2 const 어서션
// 명시적 타입 애너테이션에 튜플 타입을 입력하는 작업은 명시적 타입 애너테이션을 입력하라 때와 동일한 이유로 번거로울 수 있습니다.
// 대안으로 타입스크립트는 값 뒤에 넣을 수 있는 const 어서션인 as const 연산자를 제공합니다.
// const 어서션은 타입스크립트에 타입을 유추할 때 읽기 전용이 가능한 값 형식을 사용하도록 지시합니다.
// 다음과 같이 배열 리터럴 뒤에 as const가 배치되면 배열이 튜플로 처리되어야 함을 나타냅니다.

// 타입: (string | number)[]
const unionArray = [1157, "Tomas"];

// 타입: readonly [1157, "Tomas"]
const readonlyTuple = [1157, "Tomas"] as const;

// const 어서션은 유연한 크기의 배열을 고정된 크기의 튜플로 전환하는 것을 넘어서, 해당 튜플이 읽기 전용이고 값 수정이 예상되는 곳에서 사용할 수 없음을 나타냅니다.

const pairMutable: [number, string] = [1157, "토마스"];
pairMutable[0] = 2000; // OK

const readonlyPair = [1157, "토마스"] as const;
const pairAlsoMutable: [number, string] = readonlyPair; // Error: 'readonly [1157, "토마스"]' 형식은 'readonly'이며 변경 가능한 형식 '[number, string]'에 할당할 수 없습니다.

const pairConst = [1157, "토마스"] as const;
pairConst[0] = 2000; // Error: 읽기 전용 속성이므로 '0'에 할당할 수 없습니다.
