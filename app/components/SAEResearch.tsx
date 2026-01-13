"use client";

import { useState } from "react";

interface CollapsibleProps {
  title: string;
  tag?: string;
  tagType?: "finding" | "method" | "default";
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function Collapsible({ title, tag, tagType = "default", defaultOpen = false, children }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const tagClass = tagType === "finding" ? "tag-success" : tagType === "method" ? "tag-muted" : "";

  return (
    <div className="border border-[var(--border)] mb-2 bg-[var(--paper)]">
      <div
        className="flex justify-between items-center p-4 cursor-pointer collapsible-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-base font-semibold flex items-center gap-3">
          {tag && <span className={`tag ${tagClass}`}>{tag}</span>}
          {title}
        </h3>
        <span className={`text-[var(--muted)] transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </div>
      {isOpen && (
        <div className="px-4 pb-4 border-t border-[var(--border)]">
          {children}
        </div>
      )}
    </div>
  );
}

export function SAEResearch() {
  return (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)]">
        <div className="bg-[var(--paper)] p-4 text-center">
          <div className="stat-value text-2xl">99%</div>
          <div className="text-xs text-[var(--muted)] mt-1 uppercase tracking-wide">SAE Transfer</div>
          <div className="text-xs text-[var(--muted)]">BF16→INT4</div>
        </div>
        <div className="bg-[var(--paper)] p-4 text-center">
          <div className="stat-value text-2xl">-50%</div>
          <div className="text-xs text-[var(--muted)] mt-1 uppercase tracking-wide">Code (HumanEval)</div>
          <div className="text-xs text-[var(--muted)]">40%→20%</div>
        </div>
        <div className="bg-[var(--paper)] p-4 text-center">
          <div className="stat-value text-2xl">0%</div>
          <div className="text-xs text-[var(--muted)] mt-1 uppercase tracking-wide">Knowledge (MMLU)</div>
          <div className="text-xs text-[var(--muted)]">100%→100%</div>
        </div>
        <div className="bg-[var(--paper)] p-4 text-center">
          <div className="stat-value text-2xl">2.3×</div>
          <div className="text-xs text-[var(--muted)] mt-1 uppercase tracking-wide">Undercomplete</div>
          <div className="text-xs text-[var(--muted)]">0.5× beats 8×</div>
        </div>
      </div>

      {/* TL;DR */}
      <div className="insight-box">
        <strong>TL;DR:</strong> BF16-trained SAEs work on INT4 models (99% correlation). Code generation breaks at INT4 (-50%), knowledge retrieval survives (0% loss). Undercomplete SAEs (0.5× model dimension) transfer 2.3× better than overcomplete (8×).
      </div>

      {/* Finding 1 */}
      <Collapsible title="Degradation has structure" tag="Finding 1" tagType="finding" defaultOpen>
        <div className="space-y-4 mt-4">
          <div className="flex gap-4 text-xs font-mono mb-4">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-yellow-400 rounded-sm"></span> INT4
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-amber-600 rounded-sm"></span> BF16 total
            </span>
          </div>

          {/* Code degradation */}
          <div className="space-y-2">
            <div className="text-sm font-semibold">Code (HumanEval)</div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[var(--muted)] w-20 text-right">Qwen3</span>
              <div className="flex-1 h-5 bg-[var(--border)] rounded overflow-hidden flex">
                <div className="bg-yellow-400 h-full flex items-center justify-center text-xs font-mono" style={{ width: "20%" }}>20%</div>
                <div className="bg-amber-600 h-full flex items-center justify-center text-xs font-mono text-white" style={{ width: "20%" }}>40%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[var(--muted)] w-20 text-right">StarCoder2</span>
              <div className="flex-1 h-5 bg-[var(--border)] rounded overflow-hidden flex">
                <div className="bg-yellow-400 h-full flex items-center justify-center text-xs font-mono" style={{ width: "18%" }}>18%</div>
                <div className="bg-amber-600 h-full flex items-center justify-center text-xs font-mono text-white" style={{ width: "17%" }}>35%</div>
              </div>
            </div>
          </div>

          {/* Math */}
          <div className="space-y-2">
            <div className="text-sm font-semibold">Math (GSM8K)</div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[var(--muted)] w-20 text-right">Qwen3</span>
              <div className="flex-1 h-5 bg-[var(--border)] rounded overflow-hidden flex">
                <div className="bg-yellow-400 h-full flex items-center justify-center text-xs font-mono" style={{ width: "87%" }}>87%</div>
                <div className="bg-amber-600 h-full flex items-center justify-center text-xs font-mono text-white" style={{ width: "6%" }}></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[var(--muted)] w-20 text-right">StarCoder2</span>
              <div className="flex-1 h-5 bg-[var(--border)] rounded overflow-hidden flex">
                <div className="bg-yellow-400 h-full flex items-center justify-center text-xs font-mono" style={{ width: "71%" }}>71%</div>
                <div className="bg-amber-600 h-full flex items-center justify-center text-xs font-mono text-white" style={{ width: "7%" }}>78%</div>
              </div>
            </div>
          </div>

          {/* Knowledge */}
          <div className="space-y-2">
            <div className="text-sm font-semibold">Knowledge (MMLU-CS)</div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[var(--muted)] w-20 text-right">Qwen3</span>
              <div className="flex-1 h-5 bg-[var(--border)] rounded overflow-hidden flex">
                <div className="bg-gradient-to-r from-amber-600 to-yellow-400 h-full flex items-center justify-center text-xs font-mono text-white" style={{ width: "100%" }}>100%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[var(--muted)] w-20 text-right">StarCoder2</span>
              <div className="flex-1 h-5 bg-[var(--border)] rounded overflow-hidden flex">
                <div className="bg-gradient-to-r from-amber-600 to-yellow-400 h-full flex items-center justify-center text-xs font-mono text-white" style={{ width: "93%" }}>93%</div>
              </div>
            </div>
          </div>

          <div className="insight-box mt-4">
            <strong>Pattern:</strong> Generative tasks (code) break first. Discriminative tasks (knowledge) survive. Quantization adds noise to generation, not retrieval.
          </div>
        </div>
      </Collapsible>

      {/* Finding 2 */}
      <Collapsible title="SAEs transfer across precisions" tag="Finding 2" tagType="finding">
        <div className="mt-4">
          <ul className="bullet-arrow space-y-2">
            <li className="py-1 border-b border-[var(--border)]">
              <span className="font-semibold">Sample correlation:</span>{" "}
              <span className="stat-value">99%</span>{" "}
              <span className="text-[var(--muted)]">— Same inputs → same features fire</span>
            </li>
            <li className="py-1 border-b border-[var(--border)]">
              <span className="font-semibold">Top-10 agreement:</span>{" "}
              <span className="stat-value">89%</span>{" "}
              <span className="text-[var(--muted)]">— 9/10 most active features match</span>
            </li>
            <li className="py-1 border-b border-[var(--border)]">
              <span className="font-semibold">Feature correlation:</span>{" "}
              <span className="stat-value">95%</span>{" "}
              <span className="text-[var(--muted)]">— Each feature behaves consistently</span>
            </li>
            <li className="py-1">
              <span className="font-semibold">Sparsity agreement:</span>{" "}
              <span className="stat-value">99%</span>{" "}
              <span className="text-[var(--muted)]">— Same features stay silent/active</span>
            </li>
          </ul>

          <table className="data-table mt-4 w-full">
            <thead>
              <tr>
                <th>Metric</th>
                <th>FP16</th>
                <th>INT8</th>
                <th>INT4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sample Correlation</td>
                <td className="text-[var(--success)] font-semibold">99.9%</td>
                <td className="text-[var(--success)] font-semibold">99.7%</td>
                <td className="text-[var(--accent)] font-semibold">99.0%</td>
              </tr>
              <tr>
                <td>Feature Correlation</td>
                <td className="text-[var(--success)] font-semibold">99.7%</td>
                <td className="text-[var(--success)] font-semibold">98.5%</td>
                <td className="text-[var(--accent)] font-semibold">95.3%</td>
              </tr>
              <tr>
                <td>Top-10 Agreement</td>
                <td className="text-[var(--success)] font-semibold">97.2%</td>
                <td className="text-[var(--success)] font-semibold">94.1%</td>
                <td className="text-[var(--accent)] font-semibold">88.9%</td>
              </tr>
            </tbody>
          </table>

          <div className="insight-box mt-4">
            <strong>Implication:</strong> Train interpretability tools on expensive BF16, deploy monitoring on cheap INT4. Features mean the same thing across precisions.
          </div>
        </div>
      </Collapsible>

      {/* Finding 3 */}
      <Collapsible title="Undercomplete SAEs transfer better" tag="Finding 3" tagType="finding">
        <div className="mt-4">
          <p className="text-[var(--muted)] mb-4">
            Counter-intuitively, SAEs with <em>fewer</em> features (0.5× model dimension) transfer across precisions 2.3× better than larger SAEs (8×).
          </p>

          <table className="data-table w-full">
            <thead>
              <tr>
                <th>SAE Size</th>
                <th>Alignment</th>
                <th>Features Alive</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-[var(--accent)] font-semibold">0.5× (1024 features)</td>
                <td className="text-[var(--accent)] font-semibold">79%</td>
                <td>60%</td>
                <td className="text-[var(--accent)] font-semibold">Best</td>
              </tr>
              <tr>
                <td>1× (2048 features)</td>
                <td>71%</td>
                <td>46%</td>
                <td>Baseline</td>
              </tr>
              <tr>
                <td>2× (4096 features)</td>
                <td>56%</td>
                <td>20%</td>
                <td>Common default</td>
              </tr>
              <tr>
                <td className="text-[var(--warning)]">8× (16384 features)</td>
                <td className="text-[var(--warning)]">34%</td>
                <td className="text-[var(--warning)]">1%</td>
                <td className="text-[var(--warning)]">Worst</td>
              </tr>
            </tbody>
          </table>

          <div className="insight-box mt-4">
            <strong>Intuition:</strong> With limited capacity, the SAE must learn only the most fundamental features — ones that exist regardless of precision. Larger SAEs have room to memorize precision-specific artifacts that don&apos;t transfer.
          </div>
        </div>
      </Collapsible>

      {/* Method */}
      <Collapsible title="How we ran experiments" tag="Method" tagType="method">
        <div className="mt-4">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-[var(--border)]">
              <div className="text-xl font-mono font-semibold">2</div>
              <div className="text-xs text-[var(--muted)] uppercase">Models</div>
            </div>
            <div className="text-center p-3 bg-[var(--border)]">
              <div className="text-xl font-mono font-semibold">4</div>
              <div className="text-xs text-[var(--muted)] uppercase">Precisions</div>
            </div>
            <div className="text-center p-3 bg-[var(--border)]">
              <div className="text-xl font-mono font-semibold">168</div>
              <div className="text-xs text-[var(--muted)] uppercase">SAEs</div>
            </div>
            <div className="text-center p-3 bg-[var(--border)]">
              <div className="text-xl font-mono font-semibold">16h</div>
              <div className="text-xs text-[var(--muted)] uppercase">H100 Time</div>
            </div>
          </div>

          <h4 className="font-semibold mt-4 mb-2">Models</h4>
          <ul className="bullet-arrow text-sm space-y-1">
            <li><span className="font-semibold">Qwen3-Coder-30B-A3B:</span> <span className="text-[var(--muted)]">MoE architecture, d_model=2048, 48 layers</span></li>
            <li><span className="font-semibold">StarCoder2-15B:</span> <span className="text-[var(--muted)]">Dense architecture, d_model=6144, 40 layers</span></li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">Precisions</h4>
          <ul className="bullet-arrow text-sm space-y-1">
            <li><span className="font-semibold">BF16:</span> <span className="text-[var(--muted)]">torch.bfloat16 - baseline full precision</span></li>
            <li><span className="font-semibold">FP16:</span> <span className="text-[var(--muted)]">torch.float16 - half precision</span></li>
            <li><span className="font-semibold">INT8:</span> <span className="text-[var(--muted)]">bitsandbytes load_in_8bit</span></li>
            <li><span className="font-semibold">INT4:</span> <span className="text-[var(--muted)]">bitsandbytes NF4 quantization</span></li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">Pipeline</h4>
          <ul className="bullet-arrow text-sm space-y-1">
            <li>Load model at each precision (BF16, FP16, INT8, INT4)</li>
            <li>Extract activations at 7-11 layers (early, middle, late)</li>
            <li>Train SAE per precision per layer</li>
            <li>Procrustes alignment: compare BF16 features vs quantized</li>
            <li>Semantic transfer: apply BF16-trained SAE to INT4 activations</li>
            <li>Benchmark: HumanEval (10), GSM8K (15), MMLU-CS (15)</li>
          </ul>
        </div>
      </Collapsible>

      {/* Impact */}
      <Collapsible title="Why this matters for safety" tag="Impact">
        <div className="mt-4">
          <ul className="bullet-arrow space-y-2">
            <li className="py-1 border-b border-[var(--border)]">
              <span className="font-semibold">The gap:</span>{" "}
              <span className="text-[var(--muted)]">Interpretability research uses BF16. Production uses INT4.</span>
            </li>
            <li className="py-1 border-b border-[var(--border)]">
              <span className="font-semibold">The question:</span>{" "}
              <span className="text-[var(--muted)]">Do safety guarantees from BF16 transfer to INT4?</span>
            </li>
            <li className="py-1 border-b border-[var(--border)]">
              <span className="font-semibold">Our answer:</span>{" "}
              <span className="text-[var(--muted)]">Features transfer (99%). SAEs can be cross-precision monitors.</span>
            </li>
            <li className="py-1">
              <span className="font-semibold">Practical:</span>{" "}
              <span className="text-[var(--muted)]">Train expensive interpretability on BF16, deploy monitoring on cheap INT4.</span>
            </li>
          </ul>
        </div>
      </Collapsible>
    </div>
  );
}
