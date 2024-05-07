
$$
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
mean\{min(\pi_{\theta}(a_t|s_t) * \hat{A},clipped* \hat{A}) +
 \beta \times \pi_{new}(a_t|s_t) \times K.log(\pi_{new}(a_t|s_t) + 1e-10))\}
\\
DKL(Q||P)=∑x∈XQ(x)[log(1/P(x))] - ∑x∈XQ(x)[log[1/Q(x)]]=∑x∈XQ(x)log[Q(x)/P(x)]  　　由于-log(u)是凸函数，因此有下面的不等式  　　\\

DKL(Q||P) = -∑x∈XQ(x)log[P(x)/Q(x)] = E[-logP(x)/Q(x)] ≥ -logE[P(x)/Q(x)] = -　　log∑x∈XQ(x)P(x)/Q(x) = 0  

$$
