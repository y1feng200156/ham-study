## 2026-10-08

- fix: 按振子线径分别修正反射器与引向器切割长度，并保持默认 4 mm 基线 / Adjust reflector and director cut lengths for element diameter while preserving the default 4 mm baseline
- fix: 将玻璃钢动臂从辐射损耗估算中分离，并取消其金属动臂修正 / Exclude fiberglass booms from radiator loss estimates and metal-boom correction
- feat: 为折合与直立振子加入随选项变化的馈电匹配提示，并明确需实测阻抗 / Add driven-element matching guidance and clarify that feedpoint impedance needs measurement
- fix: 修正动臂修正提示中的 k 值插值 / Fix k-value interpolation in the boom-correction notice
- chore: 支持为页面测试指定独立端口 / Allow page tests to use a separate port
- chore: 将八木计算器修复部署至 Cloudflare Worker ham-study / Deploy Yagi calculator fixes to Cloudflare Worker ham-study
