

```python
程序逻辑
policy().get_action():
    通过actor网络预测行动概率分布
    返回：采取的哪一个行动，采取行动矩阵，行动概率分布
memory().store:
    保存每步的【state，行动矩阵，行动概率分布，奖励，是否终止】
actor网络输入包含；
    [state,优势，行动概率分布，采取行动矩阵]
ppo_loss输入：
    【老的采取行动矩阵，新的行动概率分布，优势函数，老的行动概率分布】
    【a_old,pi_new(s),A(s,a),pi_old(s)】
```
$$
以下是loss函数：\\
\pi(s)=\Sigma_i\pi(a_i|s)\\
-->A()\\
 \\
存在\begin{cases}
\lim_{k \to ∞}v_k \to \lim_{k \to ∞}v_{\pi_k} \to v^*\\
\lim_{k \to ∞}v_k \to v^*\\
\end{cases}\\
1\\
这是信息墒的定义：\\
H(p) = -\sum_{x} p(x) \log p(x)\\
\\
这是优势函数的定义:\\
advantage =\hat{A}(s,a) = Q(s,a)-V(s)\\
这是策略概率函数：\\
\pi_{new}(a_t|s_t)=A_t \times \pi_{new}(s_t)\\
\pi_{old}(a_t|s_t)=A_t \times \pi_{old}(s_t)\\
\pi_{\theta}(a_t|s_t)=\frac {\pi_{new}(a_t|s_t)}{\pi_{old}(a_t|s_t)}\\
这是最后的return：\\
-mean\{min(\pi_{\theta}(a_t|s_t) * \hat{A},clipped* \hat{A}) +
 \beta \times \pi_{new}(a_t|s_t) \times K.log(\pi_{new}(a_t|s_t) + 1e-10))\}
\\
优势函数的具体计算：\\

predvalue=V(s)
\\
数据预处理\\
get_all_as_tensors
fanh
$$
