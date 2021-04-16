import { Province, sampleProvinceData } from "../Province.js"
import assert from 'assert';

describe('province', function() {
  it('shortfall', function() {
    const asia = new Province(sampleProvinceData()); // 픽스처(고정장치) 설정
    assert.strictEqual(asia.shortfall, 5); // 고정장치 검증
  })
})