#include <stdio.h>
#include <stdint.h>
int luhnTest(uint64_t luhnNum, uint64_t luhnArr[16]);
int main()
{
    uint64_t luhnNum;
    uint64_t luhnArr[16];
    scanf("%ld", &luhnNum);
    int res = luhnTest(luhnNum, luhnArr);
    if (res)
        printf("valid\n");
    else
        printf("not valid\n");
}
int luhnTest(uint64_t luhnNum, uint64_t luhnArr[16])
{
    uint64_t luhnSum = 0;
    // Trf to arr in reverse
    for (uint64_t i = 0; i < 16; i++)
    {
        luhnArr[i] = luhnNum % 10;
        luhnNum /= 10;
    }
    // Maps
    for (uint64_t i = 0; i < 16; i++)
    {
        uint64_t pos = i + 1;
        if (pos % 2 == 0)
        {
            luhnArr[i] *= 2;
            if (luhnArr[i] > 9)
                luhnArr[i] -= 9;
        }
    }
    // Sum
    for (uint64_t i = 0; i < 16; i++)
    {
        luhnSum += luhnArr[i];
    }
    // Check
    return luhnSum % 10 == 0;
};
