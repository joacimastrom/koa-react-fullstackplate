window.PR_SHOULD_USE_CONTINUATION = true;
(function() {
  const h = ["break,continue,do,else,for,if,return,while"];
  const u = [
    h,
    "auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"
  ];
  const p = [
    u,
    "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"
  ];
  const l = [
    p,
    "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"
  ];
  const x = [
    p,
    "abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"
  ];
  const R = [
    x,
    "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"
  ];
  const r =
    "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes";
  const w = [
    p,
    "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"
  ];
  const s =
    "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END";
  const I = [
    h,
    "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"
  ];
  const f = [
    h,
    "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"
  ];
  const H = [h, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"];
  const A = [l, R, w, s + I, f, H];
  const e = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/;
  const C = "str";
  const z = "kwd";
  const j = "com";
  const O = "typ";
  const G = "lit";
  const L = "pun";
  const F = "pln";
  const m = "tag";
  const E = "dec";
  const J = "src";
  const P = "atn";
  const n = "atv";
  const N = "nocode";
  const M =
    "(?:^^\\.?|[+-]|\\!|\\!=|\\!==|\\#|\\%|\\%=|&|&&|&&=|&=|\\(|\\*|\\*=|\\+=|\\,|\\-=|\\->|\\/|\\/=|:|::|\\;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\@|\\[|\\^|\\^=|\\^\\^|\\^\\^=|\\{|\\||\\|=|\\|\\||\\|\\|=|\\~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*";
  function k(Z) {
    let ad = 0;
    let S = false;
    let ac = false;
    for (var V = 0, U = Z.length; V < U; ++V) {
      var ae = Z[V];
      if (ae.ignoreCase) {
        ac = true;
      } else if (
        /[a-z]/i.test(
          ae.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, "")
        )
      ) {
        S = true;
        ac = false;
        break;
      }
    }
    const Y = { b: 8, t: 9, n: 10, v: 11, f: 12, r: 13 };
    function ab(ah) {
      let ag = ah.charCodeAt(0);
      if (ag !== 92) {
        return ag;
      }
      const af = ah.charAt(1);
      ag = Y[af];
      if (ag) {
        return ag;
      }
      if (af >= "0" && af <= "7") {
        return parseInt(ah.substring(1), 8);
      }
      if (af === "u" || af === "x") {
        return parseInt(ah.substring(2), 16);
      }
      return ah.charCodeAt(1);
    }
    function T(af) {
      if (af < 32) {
        return (af < 16 ? "\\x0" : "\\x") + af.toString(16);
      }
      let ag = String.fromCharCode(af);
      if (ag === "\\" || ag === "-" || ag === "[" || ag === "]") {
        ag = `\\${ag}`;
      }
      return ag;
    }
    function X(am) {
      const aq = am
        .substring(1, am.length - 1)
        .match(
          new RegExp(
            "\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]",
            "g"
          )
        );
      const ak = [];
      const af = [];
      const ao = aq[0] === "^";
      for (var ar = ao ? 1 : 0, aj = aq.length; ar < aj; ++ar) {
        const ah = aq[ar];
        if (/\\[bdsw]/i.test(ah)) {
          ak.push(ah);
        } else {
          const ag = ab(ah);
          var al;
          if (ar + 2 < aj && aq[ar + 1] === "-") {
            al = ab(aq[ar + 2]);
            ar += 2;
          } else {
            al = ag;
          }
          af.push([ag, al]);
          if (!(al < 65 || ag > 122)) {
            if (!(al < 65 || ag > 90)) {
              af.push([Math.max(65, ag) | 32, Math.min(al, 90) | 32]);
            }
            if (!(al < 97 || ag > 122)) {
              af.push([Math.max(97, ag) & ~32, Math.min(al, 122) & ~32]);
            }
          }
        }
      }
      af.sort((av, au) => av[0] - au[0] || au[1] - av[1]);
      const ai = [];
      let ap = [NaN, NaN];
      for (var ar = 0; ar < af.length; ++ar) {
        var at = af[ar];
        if (at[0] <= ap[1] + 1) {
          ap[1] = Math.max(ap[1], at[1]);
        } else {
          ai.push((ap = at));
        }
      }
      const an = ["["];
      if (ao) {
        an.push("^");
      }
      an.push(...ak);
      for (var ar = 0; ar < ai.length; ++ar) {
        var at = ai[ar];
        an.push(T(at[0]));
        if (at[1] > at[0]) {
          if (at[1] + 1 > at[0]) {
            an.push("-");
          }
          an.push(T(at[1]));
        }
      }
      an.push("]");
      return an.join("");
    }
    function W(al) {
      const aj = al.source.match(
        new RegExp(
          "(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)",
          "g"
        )
      );
      const ah = aj.length;
      const an = [];
      for (var ak = 0, am = 0; ak < ah; ++ak) {
        var ag = aj[ak];
        if (ag === "(") {
          ++am;
        } else if (ag.charAt(0) === "\\") {
          var af = +ag.substring(1);
          if (af && af <= am) {
            an[af] = -1;
          }
        }
      }
      for (var ak = 1; ak < an.length; ++ak) {
        if (an[ak] === -1) {
          an[ak] = ++ad;
        }
      }
      for (var ak = 0, am = 0; ak < ah; ++ak) {
        var ag = aj[ak];
        if (ag === "(") {
          ++am;
          if (an[am] === undefined) {
            aj[ak] = "(?:";
          }
        } else if (ag.charAt(0) === "\\") {
          var af = +ag.substring(1);
          if (af && af <= am) {
            aj[ak] = `\\${an[am]}`;
          }
        }
      }
      for (var ak = 0, am = 0; ak < ah; ++ak) {
        if (aj[ak] === "^" && aj[ak + 1] !== "^") {
          aj[ak] = "";
        }
      }
      if (al.ignoreCase && S) {
        for (var ak = 0; ak < ah; ++ak) {
          var ag = aj[ak];
          const ai = ag.charAt(0);
          if (ag.length >= 2 && ai === "[") {
            aj[ak] = X(ag);
          } else if (ai !== "\\") {
            aj[ak] = ag.replace(/[a-zA-Z]/g, ao => {
              const ap = ao.charCodeAt(0);
              return `[${String.fromCharCode(ap & ~32, ap | 32)}]`;
            });
          }
        }
      }
      return aj.join("");
    }
    const aa = [];
    for (var V = 0, U = Z.length; V < U; ++V) {
      var ae = Z[V];
      if (ae.global || ae.multiline) {
        throw new Error(`${ae}`);
      }
      aa.push(`(?:${W(ae)})`);
    }
    return new RegExp(aa.join("|"), ac ? "gi" : "g");
  }
  function a(V) {
    const U = /(?:^|\s)nocode(?:\s|$)/;
    const X = [];
    let T = 0;
    const Z = [];
    let W = 0;
    let S;
    if (V.currentStyle) {
      S = V.currentStyle.whiteSpace;
    } else if (window.getComputedStyle) {
      S = document.defaultView
        .getComputedStyle(V, null)
        .getPropertyValue("white-space");
    }
    const Y = S && S.substring(0, 3) === "pre";
    function aa(ab) {
      switch (ab.nodeType) {
        case 1:
          if (U.test(ab.className)) {
            return;
          }
          for (let ae = ab.firstChild; ae; ae = ae.nextSibling) {
            aa(ae);
          }
          var ad = ab.nodeName;
          if (ad === "BR" || ad === "LI") {
            X[W] = "\n";
            Z[W << 1] = T++;
            Z[(W++ << 1) | 1] = ab;
          }
          break;
        case 3:
        case 4:
          var ac = ab.nodeValue;
          if (ac.length) {
            if (!Y) {
              ac = ac.replace(/[ \t\r\n]+/g, " ");
            } else {
              ac = ac.replace(/\r\n?/g, "\n");
            }
            X[W] = ac;
            Z[W << 1] = T;
            T += ac.length;
            Z[(W++ << 1) | 1] = ab;
          }
          break;
      }
    }
    aa(V);
    return { sourceCode: X.join("").replace(/\n$/, ""), spans: Z };
  }
  function B(S, U, W, T) {
    if (!U) {
      return;
    }
    const V = { sourceCode: U, basePos: S };
    W(V);
    T.push(...V.decorations);
  }
  const v = /\S/;
  function o(S) {
    let V;
    for (let U = S.firstChild; U; U = U.nextSibling) {
      const T = U.nodeType;
      V = T === 1 ? (V ? S : U) : T === 3 ? (v.test(U.nodeValue) ? S : V) : V;
    }
    return V === S ? undefined : V;
  }
  function g(U, T) {
    const S = {};
    let V;
    (function() {
      const ad = U.concat(T);
      const ah = [];
      const ag = {};
      for (let ab = 0, Z = ad.length; ab < Z; ++ab) {
        const Y = ad[ab];
        const ac = Y[3];
        if (ac) {
          for (let ae = ac.length; --ae >= 0; ) {
            S[ac.charAt(ae)] = Y;
          }
        }
        const af = Y[1];
        const aa = `${af}`;
        if (!ag.hasOwnProperty(aa)) {
          ah.push(af);
          ag[aa] = null;
        }
      }
      ah.push(/[\0-\uffff]/);
      V = k(ah);
    })();
    const X = T.length;
    var W = function(ah) {
      const Z = ah.sourceCode;

      const Y = ah.basePos;
      const ad = [Y, F];
      let af = 0;
      const an = Z.match(V) || [];
      const aj = {};
      for (let ae = 0, aq = an.length; ae < aq; ++ae) {
        const ag = an[ae];
        let ap = aj[ag];
        let ai = void 0;
        var am;
        if (typeof ap === "string") {
          am = false;
        } else {
          let aa = S[ag.charAt(0)];
          if (aa) {
            ai = ag.match(aa[1]);
            ap = aa[0];
          } else {
            for (let ao = 0; ao < X; ++ao) {
              aa = T[ao];
              ai = ag.match(aa[1]);
              if (ai) {
                ap = aa[0];
                break;
              }
            }
            if (!ai) {
              ap = F;
            }
          }
          am = ap.length >= 5 && ap.substring(0, 5) === "lang-";
          if (am && !(ai && typeof ai[1] === "string")) {
            am = false;
            ap = J;
          }
          if (!am) {
            aj[ag] = ap;
          }
        }
        const ab = af;
        af += ag.length;
        if (!am) {
          ad.push(Y + ab, ap);
        } else {
          const al = ai[1];
          let ak = ag.indexOf(al);
          let ac = ak + al.length;
          if (ai[2]) {
            ac = ag.length - ai[2].length;
            ak = ac - al.length;
          }
          const ar = ap.substring(5);
          B(Y + ab, ag.substring(0, ak), W, ad);
          B(Y + ab + ak, al, q(ar, al), ad);
          B(Y + ab + ac, ag.substring(ac), W, ad);
        }
      }
      ah.decorations = ad;
    };
    return W;
  }
  function i(T) {
    const W = [];

    const S = [];
    if (T.tripleQuotedStrings) {
      W.push([
        C,
        /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,
        null,
        "'\""
      ]);
    } else if (T.multiLineStrings) {
      W.push([
        C,
        /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,
        null,
        "'\"`"
      ]);
    } else {
      W.push([
        C,
        /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,
        null,
        "\"'"
      ]);
    }
    if (T.verbatimStrings) {
      S.push([C, /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null]);
    }
    const Y = T.hashComments;
    if (Y) {
      if (T.cStyleComments) {
        if (Y > 1) {
          W.push([j, /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, "#"]);
        } else {
          W.push([
            j,
            /^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\r\n]*)/,
            null,
            "#"
          ]);
        }
        S.push([
          C,
          /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/,
          null
        ]);
      } else {
        W.push([j, /^#[^\r\n]*/, null, "#"]);
      }
    }
    if (T.cStyleComments) {
      S.push([j, /^\/\/[^\r\n]*/, null]);
      S.push([j, /^\/\*[\s\S]*?(?:\*\/|$)/, null]);
    }
    if (T.regexLiterals) {
      const X =
        "/(?=[^/*])(?:[^/\\x5B\\x5C]|\\x5C[\\s\\S]|\\x5B(?:[^\\x5C\\x5D]|\\x5C[\\s\\S])*(?:\\x5D|$))+/";
      S.push(["lang-regex", new RegExp(`^${M}(${X})`)]);
    }
    const V = T.types;
    if (V) {
      S.push([O, V]);
    }
    const U = `${T.keywords}`.replace(/^ | $/g, "");
    if (U.length) {
      S.push([z, new RegExp(`^(?:${U.replace(/[\s,]+/g, "|")})\\b`), null]);
    }
    W.push([F, /^\s+/, null, " \r\n\t\xA0"]);
    S.push(
      [G, /^@[a-z_$][a-z_$@0-9]*/i, null],
      [O, /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, null],
      [F, /^[a-z_$][a-z_$@0-9]*/i, null],
      [
        G,
        new RegExp(
          "^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*",
          "i"
        ),
        null,
        "0123456789"
      ],
      [F, /^\\[\s\S]?/, null],
      [L, /^.[^\s\w\.$@\'\"\`\/\#\\]*/, null]
    );
    return g(W, S);
  }
  const K = i({
    keywords: A,
    hashComments: true,
    cStyleComments: true,
    multiLineStrings: true,
    regexLiterals: true
  });
  function Q(V, ag) {
    const U = /(?:^|\s)nocode(?:\s|$)/;
    const ab = /\r\n?|\n/;
    const ac = V.ownerDocument;
    let S;
    if (V.currentStyle) {
      S = V.currentStyle.whiteSpace;
    } else if (window.getComputedStyle) {
      S = ac.defaultView
        .getComputedStyle(V, null)
        .getPropertyValue("white-space");
    }
    const Z = S && S.substring(0, 3) === "pre";
    let af = ac.createElement("LI");
    while (V.firstChild) {
      af.appendChild(V.firstChild);
    }
    const W = [af];
    function ae(al) {
      switch (al.nodeType) {
        case 1:
          if (U.test(al.className)) {
            break;
          }
          if (al.nodeName === "BR") {
            ad(al);
            if (al.parentNode) {
              al.parentNode.removeChild(al);
            }
          } else {
            for (let an = al.firstChild; an; an = an.nextSibling) {
              ae(an);
            }
          }
          break;
        case 3:
        case 4:
          if (Z) {
            const am = al.nodeValue;
            const aj = am.match(ab);
            if (aj) {
              const ai = am.substring(0, aj.index);
              al.nodeValue = ai;
              const ah = am.substring(aj.index + aj[0].length);
              if (ah) {
                const ak = al.parentNode;
                ak.insertBefore(ac.createTextNode(ah), al.nextSibling);
              }
              ad(al);
              if (!ai) {
                al.parentNode.removeChild(al);
              }
            }
          }
          break;
      }
    }
    function ad(ak) {
      while (!ak.nextSibling) {
        ak = ak.parentNode;
        if (!ak) {
          return;
        }
      }
      function ai(al, ar) {
        const aq = ar ? al.cloneNode(false) : al;
        const ao = al.parentNode;
        if (ao) {
          const ap = ai(ao, 1);
          let an = al.nextSibling;
          ap.appendChild(aq);
          for (let am = an; am; am = an) {
            an = am.nextSibling;
            ap.appendChild(am);
          }
        }
        return aq;
      }
      let ah = ai(ak.nextSibling, 0);
      for (var aj; (aj = ah.parentNode) && aj.nodeType === 1; ) {
        ah = aj;
      }
      W.push(ah);
    }
    for (var Y = 0; Y < W.length; ++Y) {
      ae(W[Y]);
    }
    if (ag === (ag | 0)) {
      W[0].setAttribute("value", ag);
    }
    const aa = ac.createElement("OL");
    aa.className = "linenums";
    const X = Math.max(0, (ag - 1) | 0) || 0;
    for (var Y = 0, T = W.length; Y < T; ++Y) {
      af = W[Y];
      af.className = `L${(Y + X) % 10}`;
      if (!af.firstChild) {
        af.appendChild(ac.createTextNode("\xA0"));
      }
      aa.appendChild(af);
    }
    V.appendChild(aa);
  }
  function D(ac) {
    const aj = /\bMSIE\b/.test(navigator.userAgent);
    const am = /\n/g;
    const al = ac.sourceCode;
    const an = al.length;
    let V = 0;
    const aa = ac.spans;
    const T = aa.length;
    let ah = 0;
    const X = ac.decorations;
    let Y = X.length;
    let Z = 0;
    X[Y] = an;
    let ar;
    let aq;
    for (aq = ar = 0; aq < Y; ) {
      if (X[aq] !== X[aq + 2]) {
        X[ar++] = X[aq++];
        X[ar++] = X[aq++];
      } else {
        aq += 2;
      }
    }
    Y = ar;
    for (aq = ar = 0; aq < Y; ) {
      const at = X[aq];
      const ab = X[aq + 1];
      var W = aq + 2;
      while (W + 2 <= Y && X[W + 1] === ab) {
        W += 2;
      }
      X[ar++] = at;
      X[ar++] = ab;
      aq = W;
    }
    Y = X.length = ar;
    const ae = null;
    while (ah < T) {
      const af = aa[ah];
      const S = aa[ah + 2] || an;
      const ag = X[Z];
      const ap = X[Z + 2] || an;
      var W = Math.min(S, ap);
      let ak = aa[ah + 1];
      var U;
      if (ak.nodeType !== 1 && (U = al.substring(V, W))) {
        if (aj) {
          U = U.replace(am, "\r");
        }
        ak.nodeValue = U;
        const ai = ak.ownerDocument;
        const ao = ai.createElement("SPAN");
        ao.className = X[Z + 1];
        const ad = ak.parentNode;
        ad.replaceChild(ao, ak);
        ao.appendChild(ak);
        if (V < S) {
          aa[ah + 1] = ak = ai.createTextNode(al.substring(W, S));
          ad.insertBefore(ak, ao.nextSibling);
        }
      }
      V = W;
      if (V >= S) {
        ah += 2;
      }
      if (V >= ap) {
        Z += 2;
      }
    }
  }
  const t = {};
  function c(U, V) {
    for (let S = V.length; --S >= 0; ) {
      const T = V[S];
      if (!t.hasOwnProperty(T)) {
        t[T] = U;
      } else if (window.console) {
        console.warn("cannot override language handler %s", T);
      }
    }
  }
  function q(T, S) {
    if (!(T && t.hasOwnProperty(T))) {
      T = /^\s*</.test(S) ? "default-markup" : "default-code";
    }
    return t[T];
  }
  c(K, ["default-code"]);
  c(
    g(
      [],
      [
        [F, /^[^<?]+/],
        [E, /^<!\w[^>]*(?:>|$)/],
        [j, /^<\!--[\s\S]*?(?:-\->|$)/],
        ["lang-", /^<\?([\s\S]+?)(?:\?>|$)/],
        ["lang-", /^<%([\s\S]+?)(?:%>|$)/],
        [L, /^(?:<[%?]|[%?]>)/],
        ["lang-", /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],
        ["lang-js", /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],
        ["lang-css", /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],
        ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]
      ]
    ),
    ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]
  );
  c(
    g(
      [
        [F, /^[\s]+/, null, " \t\r\n"],
        [n, /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, "\"'"]
      ],
      [
        [m, /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],
        [P, /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
        ["lang-uq.val", /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],
        [L, /^[=<>\/]+/],
        ["lang-js", /^on\w+\s*=\s*\"([^\"]+)\"/i],
        ["lang-js", /^on\w+\s*=\s*\'([^\']+)\'/i],
        ["lang-js", /^on\w+\s*=\s*([^\"\'>\s]+)/i],
        ["lang-css", /^style\s*=\s*\"([^\"]+)\"/i],
        ["lang-css", /^style\s*=\s*\'([^\']+)\'/i],
        ["lang-css", /^style\s*=\s*([^\"\'>\s]+)/i]
      ]
    ),
    ["in.tag"]
  );
  c(g([], [[n, /^[\s\S]+/]]), ["uq.val"]);
  c(i({ keywords: l, hashComments: true, cStyleComments: true, types: e }), [
    "c",
    "cc",
    "cpp",
    "cxx",
    "cyc",
    "m"
  ]);
  c(i({ keywords: "null,true,false" }), ["json"]);
  c(
    i({
      keywords: R,
      hashComments: true,
      cStyleComments: true,
      verbatimStrings: true,
      types: e
    }),
    ["cs"]
  );
  c(i({ keywords: x, cStyleComments: true }), ["java"]);
  c(i({ keywords: H, hashComments: true, multiLineStrings: true }), [
    "bsh",
    "csh",
    "sh"
  ]);
  c(
    i({
      keywords: I,
      hashComments: true,
      multiLineStrings: true,
      tripleQuotedStrings: true
    }),
    ["cv", "py"]
  );
  c(
    i({
      keywords: s,
      hashComments: true,
      multiLineStrings: true,
      regexLiterals: true
    }),
    ["perl", "pl", "pm"]
  );
  c(
    i({
      keywords: f,
      hashComments: true,
      multiLineStrings: true,
      regexLiterals: true
    }),
    ["rb"]
  );
  c(i({ keywords: w, cStyleComments: true, regexLiterals: true }), ["js"]);
  c(
    i({
      keywords: r,
      hashComments: 3,
      cStyleComments: true,
      multilineStrings: true,
      tripleQuotedStrings: true,
      regexLiterals: true
    }),
    ["coffee"]
  );
  c(g([], [[C, /^[\s\S]+/]]), ["regex"]);
  function d(V) {
    const U = V.langExtension;
    try {
      const S = a(V.sourceNode);
      const T = S.sourceCode;
      V.sourceCode = T;
      V.spans = S.spans;
      V.basePos = 0;
      q(U, T)(V);
      D(V);
    } catch (W) {
      if ("console" in window) {
        console.log(W && W.stack ? W.stack : W);
      }
    }
  }
  function y(W, V, U) {
    const S = document.createElement("PRE");
    S.innerHTML = W;
    if (U) {
      Q(S, U);
    }
    const T = { langExtension: V, numberLines: U, sourceNode: S };
    d(T);
    return S.innerHTML;
  }
  function b(ad) {
    function Y(af) {
      return document.getElementsByTagName(af);
    }
    let ac = [Y("pre"), Y("code"), Y("xmp")];
    const T = [];
    for (let aa = 0; aa < ac.length; ++aa) {
      for (let Z = 0, V = ac[aa].length; Z < V; ++Z) {
        T.push(ac[aa][Z]);
      }
    }
    ac = null;
    let W = Date;
    if (!W.now) {
      W = {
        now() {
          return +new Date();
        }
      };
    }
    let X = 0;
    let S;
    const ab = /\blang(?:uage)?-([\w.]+)(?!\S)/;
    const ae = /\bprettyprint\b/;
    function U() {
      const ag = window.PR_SHOULD_USE_CONTINUATION ? W.now() + 250 : Infinity;
      for (; X < T.length && W.now() < ag; X++) {
        const aj = T[X];
        const ai = aj.className;
        if (ai.indexOf("prettyprint") >= 0) {
          let ah = ai.match(ab);
          var am;
          if (!ah && (am = o(aj)) && am.tagName === "CODE") {
            ah = am.className.match(ab);
          }
          if (ah) {
            ah = ah[1];
          }
          let al = false;
          for (let ak = aj.parentNode; ak; ak = ak.parentNode) {
            if (
              (ak.tagName === "pre" ||
                ak.tagName === "code" ||
                ak.tagName === "xmp") &&
              ak.className &&
              ak.className.indexOf("prettyprint") >= 0
            ) {
              al = true;
              break;
            }
          }
          if (!al) {
            let af = aj.className.match(/\blinenums\b(?::(\d+))?/);
            af = af ? (af[1] && af[1].length ? +af[1] : true) : false;
            if (af) {
              Q(aj, af);
            }
            S = { langExtension: ah, sourceNode: aj, numberLines: af };
            d(S);
          }
        }
      }
      if (X < T.length) {
        setTimeout(U, 250);
      } else if (ad) {
        ad();
      }
    }
    U();
  }
  window.prettyPrintOne = y;
  window.prettyPrint = b;
  window.PR = {
    createSimpleLexer: g,
    registerLangHandler: c,
    sourceDecorator: i,
    PR_ATTRIB_NAME: P,
    PR_ATTRIB_VALUE: n,
    PR_COMMENT: j,
    PR_DECLARATION: E,
    PR_KEYWORD: z,
    PR_LITERAL: G,
    PR_NOCODE: N,
    PR_PLAIN: F,
    PR_PUNCTUATION: L,
    PR_SOURCE: J,
    PR_STRING: C,
    PR_TAG: m,
    PR_TYPE: O
  };
})();
PR.registerLangHandler(
  PR.createSimpleLexer(
    [],
    [
      [PR.PR_DECLARATION, /^<!\w[^>]*(?:>|$)/],
      [PR.PR_COMMENT, /^<\!--[\s\S]*?(?:-\->|$)/],
      [PR.PR_PUNCTUATION, /^(?:<[%?]|[%?]>)/],
      ["lang-", /^<\?([\s\S]+?)(?:\?>|$)/],
      ["lang-", /^<%([\s\S]+?)(?:%>|$)/],
      ["lang-", /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],
      [
        "lang-handlebars",
        /^<script\b[^>]*type\s*=\s*['"]?text\/x-handlebars-template['"]?\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i
      ],
      ["lang-js", /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],
      ["lang-css", /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],
      ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i],
      [PR.PR_DECLARATION, /^{{[#^>/]?\s*[\w.][^}]*}}/],
      [PR.PR_DECLARATION, /^{{&?\s*[\w.][^}]*}}/],
      [PR.PR_DECLARATION, /^{{{>?\s*[\w.][^}]*}}}/],
      [PR.PR_COMMENT, /^{{![^}]*}}/]
    ]
  ),
  ["handlebars", "hbs"]
);
PR.registerLangHandler(
  PR.createSimpleLexer(
    [[PR.PR_PLAIN, /^[ \t\r\n\f]+/, null, " \t\r\n\f"]],
    [
      [
        PR.PR_STRING,
        /^\"(?:[^\n\r\f\\\"]|\\(?:\r\n?|\n|\f)|\\[\s\S])*\"/,
        null
      ],
      [
        PR.PR_STRING,
        /^\'(?:[^\n\r\f\\\']|\\(?:\r\n?|\n|\f)|\\[\s\S])*\'/,
        null
      ],
      ["lang-css-str", /^url\(([^\)\"\']*)\)/i],
      [
        PR.PR_KEYWORD,
        /^(?:url|rgb|\!important|@import|@page|@media|@charset|inherit)(?=[^\-\w]|$)/i,
        null
      ],
      [
        "lang-css-kw",
        /^(-?(?:[_a-z]|(?:\\[0-9a-f]+ ?))(?:[_a-z0-9\-]|\\(?:\\[0-9a-f]+ ?))*)\s*:/i
      ],
      [PR.PR_COMMENT, /^\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//],
      [PR.PR_COMMENT, /^(?:<!--|-->)/],
      [PR.PR_LITERAL, /^(?:\d+|\d*\.\d+)(?:%|[a-z]+)?/i],
      [PR.PR_LITERAL, /^#(?:[0-9a-f]{3}){1,2}/i],
      [
        PR.PR_PLAIN,
        /^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i
      ],
      [PR.PR_PUNCTUATION, /^[^\s\w\'\"]+/]
    ]
  ),
  ["css"]
);
PR.registerLangHandler(
  PR.createSimpleLexer(
    [],
    [
      [
        PR.PR_KEYWORD,
        /^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i
      ]
    ]
  ),
  ["css-kw"]
);
PR.registerLangHandler(
  PR.createSimpleLexer([], [[PR.PR_STRING, /^[^\)\"\']+/]]),
  ["css-str"]
);
