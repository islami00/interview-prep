
cardnum = input().strip().strip(' ')
numList =  [int(x) for x in cardnum]
if len(numList)!=16:
    print("not valid")
    exit(1)

numList.reverse()
doubledList = [x*2 if (i+1) % 2 == 0 else x for i, x in enumerate(numList)]
reducedList = [x-9 if x > 9 else x for x in doubledList]
listSum = sum(reducedList)

if listSum % 10 == 0:
    print("valid")
else:
    print("not valid")
