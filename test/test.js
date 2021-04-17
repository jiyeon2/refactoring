import { Province, sampleProvinceData } from "../Province.js"

import {assert, expect} from 'chai';

describe('province', function() {
  // const asia = new Province(sampleProvinceData()); // 픽스처(고정장치) 설정 -> 테스트마다 중복되는 부분, 이렇게 하면 안된다!
  // const 키워드는 asia 객체 내용이 아닌, asia객체를 가리키는 참조가 상수임을 의미함
  // 하나의 테스트에서 asia 객체 내부 값을 변경하면 다른 테스트에도 영향이 감

  let asia;
  beforeEach(function(){ // 개별 테스트마다 픽스처 새로 만들어서, 테스트 독립적으로 실행 가능
    asia = new Province(sampleProvinceData());
  });

  it('shortfall', function() {
    // assert.strictEqual(asia.shortfall, 5); // 고정장치 검증 - expect와 assert 차이는 뭐지? 저자 개인적으로는 assert 선호하나 js다룰 때는 expect사용한다고 했다
    expect(asia.shortfall).equal(5);
  })

  it('profit', function() {
    expect(asia.profit).equal(230);
  })

  it ('change production', function() {
    asia.producers[0].production = 20;
    expect(asia.shortfall).equal(-6);
    expect(asia.profit).equal(292);
  })

  it('zero demand', function() { // 수요가 없다
    asia.demand = 0;
    expect(asia.shortfall).equal(-25);
    expect(asia.profit).equal(0);
  });

  // 수요가 마이너스인 경우 수익이 음수가 나오는 것이 합당한가? 
  // 수요가 음수라면 에러를 던지거나 0으로 설정하는 등 특이상황을 별도로 처리해야 맞지 않나?
  // 경계를 확인하는 테스트를 작성해보면 이런 특이사항 어떻게 처리하는 게 좋을지 생각해볼 수 있다
  it('negative demand', function() { // 수요가 마이너스
    asia.demand = -1;
    expect(asia.shortfall).equal(-26);
    expect(asia.profit).equal(-10);
  })

  it('empty string demand', function() { // 수요입력란이 비어있는 경우
    asia.demand = '';
    expect(asia.shortfall).NaN;
    expect(asia.profit).NaN;
  })
})

// 경계조건 검사 - 범위를 벗어나는 지점에서 문제가 생기면 어떤일이 일어나는지 확인
describe('no producer', function() {
  let noProducers;
  beforeEach(function() {
    const data = {
      name: 'No producers',
      producers: [],
      demand: 30,
      price: 20,
    };
    noProducers = new Province(data);
  });

  it('shortfall', function() {
    expect(noProducers.shortfall).equal(30);
  })

  it('profit', function() {
    expect(noProducers.profit).equal(0);
  })

})

describe('string for producer', function(){
  it('', function(){
    const data = {
      name: "String producers",
      producers: "",
      demand:30,
      price:20
    };

    // const prov = new Province(data);
    // expect(prov.shortfall).equal(0);
    // producers 가 배열이 아닌 경우 -> 테스트 실패가 아닌 에러 상황임

    // 첫번째 인자로 들어간 함수 실행시, 두번째 인자로 들어간 에러메시지 포함된 에러 발생하는 것이 예상된다는 내용의 테스트
    assert.throws(() => {
      const prov = new Province(data);
      expect(prov.shortfall).equal(0);
    }, 'forEach is not a function')
  })
})