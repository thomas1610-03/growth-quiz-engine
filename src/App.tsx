import React, { useState } from 'react';
import { Sun, Home, Flame, CheckCircle, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState(1);
  const [travaux, setTravaux] = useState('Isolation');
  const [logement, setLogement] = useState('Maison');
  const [revenus, setRevenus] = useState('Intermédiaire');
  const [submitted, setSubmitted] = useState(false);
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-600 text-white p-2 rounded-xl">
              <Sun className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Hélios Énergie</span>
          </div>
          <span className="text-sm bg-emerald-50 text-emerald-700 font-medium px-3 py-1 rounded-full border border-emerald-200">
            Simulateur Officiel 2026
          </span>
        </div>
      </header>

      {/* Hero / Simulateur Section */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Estimez vos aides pour vos <span className="text-emerald-600">travaux de rénovation</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            MaPrimeRénov', CEE... Découvrez en 2 minutes le montant des subventions de l'État pour votre projet énergétique.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-10">
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              {/* Étape 1 : Type de travaux */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center text-slate-800">
                    <Flame className="w-5 h-5 text-emerald-600 mr-2" /> 1. Quels travaux souhaitez-vous réaliser ?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {['Isolation', 'Chauffage (PAC)', 'Panneaux solaires'].map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setTravaux(item)}
                        className={`p-4 rounded-xl border text-left font-medium transition-all ${
                          travaux === item
                            ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 ring-2 ring-emerald-600/20'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20"
                  >
                    <span>Continuer</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Étape 2 : Type de logement */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center text-slate-800">
                    <Home className="w-5 h-5 text-emerald-600 mr-2" /> 2. Quel est votre type de logement ?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {['Maison individuelle', 'Appartement'].map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setLogement(item)}
                        className={`p-4 rounded-xl border text-left font-medium transition-all ${
                          logement === item
                            ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 ring-2 ring-emerald-600/20'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl transition-all"
                    >
                      Retour
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2"
                    >
                      <span>Continuer</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Étape 3 : Coordonnées finales */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center text-slate-800">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 mr-2" /> 3. Obtenez votre estimation personnalisée
                  </h2>
                  <p className="text-sm text-slate-500 mb-6">
                    Entrez vos coordonnées pour recevoir le montant de vos aides pour votre projet de <strong>{travaux}</strong>.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Votre nom</label>
                      <input
                        type="text"
                        required
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Jean Dupont"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Votre numéro de téléphone</label>
                      <input
                        type="tel"
                        required
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        placeholder="06 12 34 56 78"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl transition-all"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-600/20"
                    >
                      Voir mes aides estimées
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="bg-emerald-100 text-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Félicitations {nom} !</h2>
              <p className="text-slate-600 max-w-md mx-auto mb-6">
                Votre dossier pour votre projet de <strong>{travaux}</strong> a bien été pris en compte. Un conseiller expert <strong>Hélios Énergie</strong> va vous contacter au <strong>{telephone}</strong> pour valider vos subventions.
              </p>
              <button
                onClick={() => { setSubmitted(false); setStep(1); }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl transition-all"
              >
                Faire une nouvelle simulation
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
