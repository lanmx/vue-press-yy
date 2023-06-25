在整理leetcode题的时候，我发现，每次把解题思路自己手动敲一遍后，对题目和解法更加理解了:hand_over_mouth:，非常不错:thumbsup:！ 建议大家也常自己复盘解题思路噢~:smiling_face_with_three_hearts:

## 前言：首先理解时间复杂度和空间复杂度
算法（Algorithm）是指用来操作数据、解决程序问题的一组方法。对于同一个问题，使用不同的算法，也许最终得到的结果是一样的，比如排序就有前面的十大经典排序和几种奇葩排序，虽然结果相同，但在过程中消耗的资源和时间却会有很大的区别，比如快速排序与猴子排序。

如何去衡量不同算法之间的优劣，主要还是从算法所占用的「时间」和「空间」两个维度去考量。
- 时间维度：是指执行当前算法所消耗的时间，我们通常用「时间复杂度」来描述。
- 空间维度：是指执行当前算法需要占用多少内存空间，我们通常用「空间复杂度」来描述。
### 时间复杂度
常见的时间复杂度量级
- 常数阶O(1)
- 线性阶O(n)
- 平方阶O(n²)
- 对数阶O(logn)
- 线性对数阶O(nlogn)O(n)
![常见的时间复杂度量级图解](@alias/167a509fc39ca44.png)

**O(1)**：无论代码执行了多少行，其他区域不会影响到操作，这个代码的时间复杂度都是O(1)
```js
function fn(a, b){
  let temp = a;
  a = b;
  b = temp;
}
```
**O(n)**：for循环里面的代码会执行 n 遍，因此它消耗的时间是随着 n 的变化而变化的，因此可以用O(n)来表示它的时间复杂度。
```js
function fn(n) {
    let total = 0
    for(let i = 0; i < n; i++) {
        total+=total
    }
    return total
}
```
**O(n²)**：类似地，当存在双重循环的时候，即把 O(n) 的代码再嵌套循环一遍，它的时间复杂度就是 O(n²) 了。

**O(logn)**： 当然并不是所有的双重循环都是 O(n²)，下面是级别的时间复杂度。
```js
// 整形转成字符串
string intToString ( int num ){
string s = "";
// n 经过几次“除以10”的操作后，等于0
while (num ){
s += '0' + num%10;
num /= 10;
}
reverse(s)
return s;
}
```
```js
void hello (int n ) {
   // n 除以几次 2 到 1
   for ( int sz = 1; sz < n ; sz += sz) 
     for (int i = 1; i < n; i++)
        cout<< "Hello,五分钟学算法：）"<< endl;
}
```

**O(nlogn)**：将时间复杂度为O(logn)的代码循环N遍的话，那么它的时间复杂度就是 n * O(logn)，也就是了O(nlogn)。

**O(log2^n)**：在二分查找法的代码中，通过while循环，成 2 倍数的缩减搜索范围，也就是说需要经过 log2^n 次即可跳出循环。

### 空间复杂度
和时间复杂度类似，一个算法的空间复杂度，也常用大 O 记法表示。

要知道每一个算法所编写的程序，运行过程中都需要占用大小不等的存储空间，
- 程序代码本身所占用的存储空间；
- 程序中如果需要输入输出数据，也会占用一定的存储空间；
- 程序在运行过程中，可能还需要临时申请更多的存储空间。
> <span style="color: red;">简单的说就是程序运行所需要的空间。</span>
> 写代码我们可以用时间换空间，也可以用空间换时间。加大空间消耗来换取运行时间的缩短加大时间的消耗换取空间。

- 如果程序所占用的存储空间和输入值无关，则该程序的空间复杂度就为 O(1)；反之，如果有关，则需要进一步判断它们之间的关系：
- 如果随着输入值 n 的增大，程序申请的临时空间成线性增长，则程序的空间复杂度用 O(n) 表示;
- 如果随着输入值 n 的增大，程序申请的临时空间成 n2 关系增长，则程序的空间复杂度用 O(n2) 表示；
- 如果随着输入值 n 的增大，程序申请的临时空间成 n3 关系增长，则程序的空间复杂度用 O(n3) 表示；

> 在多数场景中，一个好的算法往往更注重的是时间复杂度的比较，而空间复杂度只要在一个合理的范围内就可以。

下面开始算法题环游吧~~~~:hand_over_mouth::hand_over_mouth::hand_over_mouth:，持续更新复盘解题思路~
## 1、（简单）两数之和
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。
#### 解题思路
通过两个for循环，两两组合，判断每个组合之和是否等于目标值target，若等于则直接返回结果；
```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for(let i = 0; i < nums.length -1; i++) {
        for(let j = 1; j < nums.length; j++) {
            if(i === j) continue
            if(nums[i] + nums[j] === target) {
                return [i,j]
            }
        }
    }
};
```
## 2、（中等）无重复字符的最长子串
给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
#### 解题思路
无重复子串的意思就是字符串没有重复的字母，且要求长度最长。

这个解法很巧妙，有点难厉害。我慢慢道来。

复杂度为O(n)，一次循环即可拿到最长子串长度。

首先，定义一个记录最长子串长度的起始位置，minIndex = 0; 初始定义最长长度len = 0；

然后每循环一个字符串的时候，使用s.indexof(a[i], minIndex)方法，判断字符串的index是否有小于当前循环的index，如果小于，说明前面已经有一个重置的字符串了，现在又出现一个，那么最长子串长度的起始位置应该更改了，更改为前面重复字符串的index（minIndex = s.indexOf(s[i], minIndex) + 1）;

那么当前循环的所得子串的最长长度为len = Math.max(len, i - minIndex + 1)

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // minIndex: 字符串某字母的最小index
    let minIndex = 0
    // len: 不重复字符串的最大长度
    let len = 0
    for(let i = 0; i < s.length; i++) {
        // for循环遍历每个字母
        // str1.IndexOf("字",start,end)；//从str1第start+1个字符起，查找end个字符，
        /**
         * 如果字母的index小于当次循环i，
         *  1.说明该字母前面有重复的字母，因此把该字母的第一个位置的index赋值给minIndex，
         *  2.那么这时候的不重复长度为当前循环i - minIndex + 1，第0个字母的长度为1，而不是0，所以要加1
         * 否则说明没有重复字母，当前循环就是最长的字符串长度；
         *  1.也就是说当前循环的字母都没有重复的字母，那么此次循环能拿到当前循环的最大长度；
         *  2.例如：如果循环到最后一轮，一直没有重复字母，那么minIndex为0；所以i - 0 + 1就是做大长度；
         *  3.每次循环的时候都把最大的长度保存在len值，如果拿到当前的最大长度i - minIndex + 1是大于之前保存的len，则Math.max()替换掉，保留不重复字符串的最大长度
         */ 
        s.indexOf(s[i], minIndex) < i ? 
        minIndex = s.indexOf(s[i], minIndex) + 1 :
        len = Math.max(len, i - minIndex + 1)
    }
    return len
};
```
## 3、（困难）寻找两个正序数组的中位数
给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

算法的时间复杂度应该为 O(log (m+n)) 。
#### 解题思路
通过排序后，再判断数组长度是否小于等于1，如果等于0，则抛出数组长度必须大于0的提示，如果数组长度等于1，直接返回下标为0的值；
如果数组长度大于1，则判断数组长度是否为偶数，若为偶数，直接返回中间两个元素的平均值（(arr[len/2 - 1] + arr[len/2]) / 2），若为单数，则返回中间的值（arr[((len - 1) / 2)]）；
```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let conArr = nums1.concat(nums2)
    conArr = conArr.sort((a,b) => a-b)
    function getMedian(arr) {
        let len = arr.length
        if(arr.length === 1) {
            return arr[0]
        } else if (arr.length > 1) {
            if(arr.length % 2 === 0) {
                return (arr[len/2 - 1] + arr[len/2]) / 2
            } else {    
                return arr[((len - 1) / 2)]
            }
        } else if (arr.length === 0) {
            throw('数组长度必须大于1')
        }
        
    }
    return getMedian(conArr)
};
```


