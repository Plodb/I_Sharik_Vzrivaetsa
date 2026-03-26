mat3 a(float x) { return mat3(1,0,0, 0,cos(x),-sin(x), 0,sin(x),cos(x)); }
mat3 b(float x) { return mat3(cos(x),0,sin(x), 0,1,0, -sin(x),0,cos(x)); }
mat3 c(float x) { return mat3(cos(x),-sin(x),0, sin(x),cos(x),0, 0,0,1); }

float d(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 41.164))) * 43758.5453); }

float foo(vec3 p, float t, int n) {
    float r = 0.0, s = 1.0, w = 1.0;
    for(int i = 0; i < n; i++) {
        float ph = float(i) * 0.3;
        vec3 q = p * s + vec3(sin(t*0.1 + ph), 0.0, cos(t*0.08 + ph)) * 0.2;
        r += (sin(q.x) * sin(q.y * 1.1) * sin(q.z * 0.9)) / w;
        s *= 1.6; w *= 2.0;
    }
    return r * 0.5;
}

float bar(vec3 p, float t) {
    float r1 = length(p.xz) - 2.0 + sin(t*0.2)*0.1;
    float tor = length(vec2(r1, p.y)) - 0.4;
    float sph = length(p - vec3(cos(t*0.15), sin(t*0.12), 0.0) * 1.5) - 1.2;
    return min(tor, sph);
}

float baz(vec3 p) { return sin(p.x*0.7) * cos(p.y*0.6) * sin(p.z*0.8) * 0.1; }

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 u = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    float t = iTime * 0.3;
    vec3 cp = vec3(sin(t*0.7)*3.0, cos(t*0.5)*2.0, t*1.5);
    mat3 rm = a(sin(t*0.3)*0.8) * b(t*0.4) * c(cos(t*0.4)*0.3);
    vec3 ry = normalize(vec3(u * (1.0 + length(u)*0.25), 1.0));
    ry = rm * ry;
    float rd = 18.0;
    vec3 p = cp + ry * rd;
    vec3 gp = p * 1.8;
    gp.x += sin(gp.z*0.2 + t*0.5)*0.2;
    gp.y += cos(gp.z*0.15 + t*0.3)*0.2;
    float lw = 0.018;
    float lx = step(1.0-lw, fract(gp.x)) + step(fract(gp.x), lw);
    float ly = step(1.0-lw, fract(gp.y)) + step(fract(gp.y), lw);
    float lz = step(1.0-lw, fract(gp.z)) + step(fract(gp.z), lw);
    float gl = clamp(lx + ly + lz, 0.0, 1.0);
    float gh = bar(p * 0.6, t);
    float ga = smoothstep(0.05, 0.0, abs(gh)) * 0.3;
    float fr = foo(p * 0.8, t, 5);
    float fa = smoothstep(0.15, 0.0, abs(fr - 0.2)) * 0.4;
    float am = baz(p * 1.2);
    float ct = t * 0.15;
    vec3 c1 = 0.5 + 0.5*cos(ct + vec3(0, 2, 4));
    vec3 c2 = 0.5 + 0.5*cos(ct*0.8 + vec3(1, 3, 0));
    vec3 gc = mix(c1, c2, 0.5);
    vec3 ghc = mix(c2, vec3(1.0, 0.9, 0.8), 0.3);
    vec3 frc = mix(vec3(0.8, 0.6, 1.0), c1, 0.5);
    vec3 co = vec3(0.04, 0.02, 0.06);
    co = mix(co, gc, gl * (0.9 + am * 0.1));
    co = mix(co, ghc, ga);
    co += frc * fa * 0.5;
    float ix = lx * ly + ly * lz + lz * lx;
    co += gc * (ix * (0.2 + abs(fr) * 0.1)) * 0.3;
    co = mix(co, gc * 1.1, gl * (sin(fr * 5.0 + t) * 0.02));
    float cs = sin(t*0.2 + p.z*0.05) * 0.1;
    co += vec3(cs * 0.2, cs * 0.1, -cs * 0.1);
    co *= 1.0 / (1.0 + length(ry*rd)*0.05);
    co *= 1.0 - dot(u, u)*0.2;
    fragColor = vec4(pow(co, vec3(0.95)), 1.0);
}