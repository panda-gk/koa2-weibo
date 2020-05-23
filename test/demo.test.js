/**
 * @description 测试用例
 */

const { TestScheduler } = require("jest");

const sum = (a, b) => {
    return a + b
}
test('10 + 20  应该等于 30', () => {
    const res = sum(10, 20)
    expect(res).toBe(30) // 期望是20
    // expect(res).not.toBe(40) // 期望不是三十
})



