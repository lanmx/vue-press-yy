在整理leetcode题的时候，我发现，每次把解题思路自己手动敲一遍后，对题目和解法更加理解了:hand_over_mouth:，非常不错:thumbsup:！ 建议大家也常自己复盘解题思路噢~:smiling_face_with_three_hearts:
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


