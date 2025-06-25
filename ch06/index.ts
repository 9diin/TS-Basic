// 인터페이스

// 1. 타입 별칭 vs 인터페이스
type Poet = {
    born: number;
    name: string;
};

interface Poet {
    born: number;
    name: string;
}

// 위 두 구문은 동일한 구문입니다.
// 그러나 타입 별칭과 인터페이스 사이에는 몇 가지 주요 차이점이 있습니다.
// 인터페이스는 속성 증가를 위해 병합(Merge)할 수 있습니다.

// 일반적으로 인터페이스에서 타입스크립트 타입 검사기가 더 빨리 작동한다 알려져 있습니다.
// 인터페이스는 타입 별칭이 하는 것처럼 새로운 객체 리터럴의 동적인 복사 붙여넣기보다 내부적으로 더 쉽게 캐시할 수 있는 명명된 타입을 선언합니다.
// 인터페이스는 이름 없는 객체 리터럴의 별칭이 아닌 이름 있는(명명된) 객체로 간주되므로 어려운 특이케이스에서 나타나는 오류 메시지를 좀 더 쉽게 읽을 수 있습니다.

// 인터페이스는 타입스크립트가 내부적으로 이름을 가진 구조로 다루기 때문에, 복잡한 코드에서 타입 검사 속도가 조금 더 빠를 수 있습니다.
// type은 이름 없는 구조를 복사해서 쓰는 방식이라서, 내부적으로 조금 더 복잡하다고 보면 됩니다.

// 인터페이스는 이름이 있는 타입이기 때문에, 오류가 발생했을 때 에러 메시지에 Poet이라는 이름이 그대로 나타나서 이해하기 쉬워요.
// 반면, type은 이름 없이 그냥 구조만 복사해서 쓰는 경우가 많아서, 에러 메시지에 직접 구조가 길게 나올 수 있습니다.

// 2. 속성 타입
// 2.1 선택적 속성
interface Book {
    author?: string;
    pages: number;
}

// OK
const ok: Book = {
    author: "개발자 9Diin",
    pages: 80,
};

const missing: Book = {
    pages: 80,
};

// 2.2 읽기 전용 속성
// 경우에 따라 인터페이스에 정의된 객체의 속성을 재할당하지 못하도록 인터페이스 사용자를 차단하고 싶을 경우가 있습니다.
// 타입스크립트는 속성 이름 앞에 readonly 키워드를 추가해 다른 값으로 설정될 수 없음을 나타냅니다.
// 이러한 readonly 속성은 평소대로 읽을 수 있지만 새로운 값으로 재할당하지 못합니다.

interface Page {
    readonly text: string;
}

function read(page: Page) {
    // OK: text 속성을 수정하지 않고 읽는 것
    console.log(page.text);

    page.text += "!"; // Error: 읽기 전용 속성이므로 'text'에 할당할 수 없습니다.
}

// readonly 제한자는 타입 시스템에만 존재하며, 인터페이스에서만 사용할 수 있습니다.
// readonly 제한자는 객체의 인터페이스를 선언하는 위치에서만 사용되고 실제 객체에는 적용되지 않습니다.

// 2.3 함수와 메서드
// 타입스크립트는 인터페이스 멤버를 함수로 선언하는 두 가지 방법을 제공합니다.
// - 메서드 구문: 인터페이스 멤버를 member(): void와 같이 객체의 멤버로 호출되는 함수로 선언
// - 속성 구문: 인터페이스의 멤버를 member: () => void와 같이 독립 함수와 동일하게 선언
// - 메서드는 readonly로 선언할 수 없지만, 속성은 가능합니다.

interface HasBothFunctionTypes {
    property: () => string;
    method(): string;
}

const hasBoth: HasBothFunctionTypes = {
    property: () => "",
    method() {
        return "";
    },
};
hasBoth.property(); // OK
hasBoth.method(); // OK

// 두 가지 방법 모두 선택적 속성 키워드인 ?를 사용해 필수로 제공하지 않아도 되는 멤버로 나타낼 수 있습니다.
interface OptionalReadonlyFunctions {
    optionalProperty?: () => string;
    optionalMethod?(): string;
}

// 2.4 중첩 인터페이스
// 객체 타입이 다른 객체 타입의 속성으로 중첩될 수 있는 것처럼 인터페이스 타입도 자체 인터페이스 타입 혹은 객체 타입을 속성으로 가질 수 있습니다.

interface Novel {
    author: {
        name: string;
    };
    setting: Setting;
}

interface Setting {
    place: string;
    year: number;
}

let myNovel: Novel;
myNovel = {
    author: {
        name: "Jane Austen",
    },
    setting: {
        place: "England",
        year: 1812,
    },
};

myNovel = {
    author: {
        name: "Emily Bronte",
    },
    setting: {
        place: "West Yorkshire",
    },
}; // Error: 'year' 속성이 '{ place: string; }' 형식에 없지만 'Setting' 형식에서 필수입니다.

// 3. 인터페이스의 확장
// 타입스크립트는 인터페이스가 다른 인터페이스의 모든 멤버를 복사해서 선언할 수 있는 확장된(extend) 인터페이스를 허용합니다.
// 확장할 인터페이스의 이름 뒤에 extends 키워드를 추가해서 다른 인터페이스를 확장한 인터페이스라는 걸 표시합니다.
// 이렇게 하면 파생 인터페이스(derived interface)를 준수하는 모든 객체가 기본 인터페이스의 모든 멤버도 가져야 한다는 것을 타입스크립트에 알려줍니다.

interface Writing {
    title: string;
}

interface Novella extends Writing {
    pages: number;
}

let myNovella: Novella = {
    pages: 197,
    title: "Ethan Frome",
};

let missingPages: Novella = {
    title: " The Awakening",
}; // Error: 'pages' 속성이 '{ title: string; }' 형식에 없지만 'Novella' 형식에서 필수입니다.

let extraProperty: Novella = {
    pages: 300,
    strategy: "baseline",
    style: "Naturalism",
}; // Error: 개체 리터럴은 알려진 속성만 지정할 수 있으며 'Novella' 형식에 'strategy'이(가) 없습니다.

// 3.1 재정의된 속성
// 파생 인터페이스는 다른 타입으로 속성을 다시 선언해 기본 인터페이스의 속성을 재정의 하거나 대체할 수 있습니다.
// 타입스크립트의 타입 검사기는 재정의된 속성이 기본 속성에 할당되어 있도록 강요합니다.
// 이렇게 하면 파생 인터페이스의 타입의 인스턴스를 기본 인터페이스 타입에 할당할 수 있습니다.

interface WithNullableName {
    name: string | null;
}

interface WithNonNullableName extends WithNullableName {
    name: string;
}

interface WithNumbericName extends WithNullableName {
    name: string | number;
}

// WithNullableName 타입은 WithNonNullableName에서 null을 허용하지 않도록 적절하게 다시 설정됩니다.
// 그러나 WithNumbericName의 name에는 number | string이 허용되지 않습니다.
// number | string은 string | null에 할당할 수 없기 때문입니다.

// 3.2 다중 인터페이스 확장
// 타입스크립트의 인터페이스는 여러 개의 다른 인터페이스를 확장해서 선언할 수 있습니다.
// 파생 인터페이스 이름에 있는 extends 키워드 뒤에 쉼표로 인터페이스르 이름을 구분해 사용하면 됩니다.
// 파생 인터페이스는 모든 기본 인터페이스의 모든 멤버를 받습니다.

interface GivesNumber {
    giveNumber(): number;
}

interface GivesString {
    giveString(): string;
}

interface GivesBothAndEither extends GivesNumber, GivesString {
    giveEither(): number | string;
}

function useGivesBoth(instance: GivesBothAndEither) {
    instance.giveNumber(); // 타입: number
    instance.giveString(); // 타입: string
    instance.giveEither(); // 타입: number | string
}

// 4. 인터페이스 병합
// 인터페이스의 중요한 특징 중 하나는 서로 병합하는 능력입니다.
// 두 개의 인터페이스가 동일한 이름으로 동일한 스코프에 선언된 경우, 선언된 모든 필드를 포함하는 더 큰 인터페이스가 코드에 추가됩니다.

interface Merged {
    fromFirst: string;
}

interface Merged {
    fromSecond: number;
}

// 다음과 같음:
// interface Merged {
//     fromFirst: string;
//     fromSecond: number;
// }

let test: Merged = {
    fromFirst: "",
    fromSecond: 0,
};
