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
