## 의존성

코드상에서 Movie 는 DiscountPolicy 에 의존한다. 

실행 시점에서는 AmountDiscountPolicy 나 PercentDiscountPolicy 에 의존한다.

### good

코드의 의존성과 실행시점의 의존성이 다르면 다를수록 코드는 더욱 유연하고 확장가능해진다.

### bad

실제 의존성의 대상이 무엇인지 한눈에 찾기 어려워진다.
