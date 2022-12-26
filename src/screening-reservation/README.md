## 의존성

코드상에서 Movie 는 DiscountPolicy 에 의존한다. 

실행 시점에서는 AmountDiscountPolicy 나 PercentDiscountPolicy 에 의존한다.

### good

코드의 의존성과 실행시점의 의존성이 다르면 다를수록 코드는 더욱 유연하고 확장가능해진다.

### bad

실제 의존성의 대상이 무엇인지 한눈에 찾기 어려워진다.

## 상속

상속이 가치 있는 이유는 부모 클래스의 인터페이스를 자식 클래스가 물려받을 수 있기 때문

결과적으로 자식 클래스는 부모 클래스에서 수신할 수 있는 모든 메시지를 수신할 수 있다.

때문에 외부 객체는 자식 클래스를 부모 클래스와 동일한 타입으로 간주할 수 있다.

```typescript
class Movie {
  public calculateMovieFee(screening: Screening): Readonly<Money> {
    return this.fee.minus(
      this.discountPolicy.calculateDiscountAmount(screening)
    );
  }
}
```

Movie 입장에서는 `discountPolicy` 가 `calculateDiscountAmount` 메시지를 수신할 수 있단 점이 중요하다.

AmountDiscountPolicy 나 PercentDiscountPolicy 모두 DiscountPolicy 를 대신해서 Movie 와 협력할 수 있다.

이처럼 자식 클래스가 부모 클래스를 대신하는것을 **업캐스팅(upcasting)** 이라고 부른다.

## 다형성

Movie 클래스는 DiscountPolicy 클래스에게 메시지를 전송하지만 
실행 시점에 실제로 실행되는 메서드는 Movie 와 협력하는 객체의 실제 클래스가 무엇인지에 따라 달라진다.

이를 **다형성** 이라고 부른다.

다형성은 컴파일 시간 의존성과 실행 시간 의존성을 다르게 만들 수 있는
객체지향의 특성을 이용해 서로 다른 메서드를 실행할 수 있게 한다.

**다형성이란 동일한 메시지를 수신했을 때 객체의 타입에 따라 다르게 응답할 수 있는 능력을 의미한다.**

