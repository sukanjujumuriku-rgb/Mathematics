function modPow(base, exp, mod) {
    let result = 1n;
    base %= mod;

    while (exp > 0n) {
        if (exp & 1n) {
            result = (result * base) % mod;
        }

        base = (base * base) % mod;
        exp >>= 1n;
    }

    return result;
}

function isPrime(n) {
    if (n < 2n) return false;
    if (n === 2n || n === 3n) return true;

    if (n % 2n === 0n) return false;
    if (n % 3n === 0n) return false;
    if (n % 5n === 0n) return n === 5n;
    if (n % 7n === 0n) return n === 7n;
    if (n % 11n === 0n) return n === 11n;
    if (n % 13n === 0n) return n === 13n;

    let d = n - 1n;
    let s = 0;

    while ((d & 1n) === 0n) {
        d >>= 1n;
        s++;
    }

    const bases = [
        2n, 3n, 5n, 7n,
        11n, 13n, 17n,
        19n, 23n, 29n,
        31n, 37n
    ];

    for (const a of bases) {
        if (a >= n) continue;

        let x = modPow(a, d, n);

        if (x === 1n || x === n - 1n) {
            continue;
        }

        let composite = true;

        for (let r = 1; r < s; r++) {
            x = (x * x) % n;

            if (x === n - 1n) {
                composite = false;
                break;
            }
        }

        if (composite) {
            return false;
        }
    }

    return true;
}

function checkPrime() {
    const input =
        document
            .getElementById("num")
            .value
            .trim();

    const result =
        document.getElementById("result");

    try {
        const n = BigInt(input);

        const start = performance.now();

        const prime = isPrime(n);

        const end = performance.now();

        result.innerHTML =
            prime
                ? `✅ ${n} は素数です<br>(${(end - start).toFixed(3)} ms)`
                : `❌ ${n} は素数ではありません<br>(${(end - start).toFixed(3)} ms)`;

    } catch {
        result.textContent =
            "整数を入力してください";
    }
}
